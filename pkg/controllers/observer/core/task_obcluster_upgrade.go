/*
Copyright (c) 2021 OceanBase
ob-operator is licensed under Mulan PSL v2.
You can use this software according to the terms and conditions of the Mulan PSL v2.
You may obtain a copy of Mulan PSL v2 at:
         http://license.coscl.org.cn/MulanPSL2
THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
See the Mulan PSL v2 for more details.
*/

package core

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/pkg/errors"
	"sigs.k8s.io/controller-runtime/pkg/client"

	cloudv1 "github.com/oceanbase/ob-operator/apis/cloud/v1"
	myconfig "github.com/oceanbase/ob-operator/pkg/config"
	"github.com/oceanbase/ob-operator/pkg/controllers/observer/cable"
	observerconst "github.com/oceanbase/ob-operator/pkg/controllers/observer/const"
	"github.com/oceanbase/ob-operator/pkg/controllers/observer/core/converter"
	"github.com/oceanbase/ob-operator/pkg/controllers/observer/model"
	"github.com/oceanbase/ob-operator/pkg/controllers/observer/sql"
	"github.com/oceanbase/ob-operator/pkg/infrastructure/kube/resource"
	kubeerrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/klog/v2"

	batchv1 "k8s.io/api/batch/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func GenerateJobName(clusterName, name string) string {
	return fmt.Sprintf("%s-%s", clusterName, name)
}

func (ctrl *OBClusterCtrl) GenerateJobObjectPcress(jobName, image string, cmd []string) batchv1.Job {
	var backOffLimit int32
	job := batchv1.Job{
		ObjectMeta: metav1.ObjectMeta{
			Name:      jobName,
			Namespace: ctrl.OBCluster.Namespace,
		},
		Spec: batchv1.JobSpec{
			Template: corev1.PodTemplateSpec{
				Spec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:    jobName,
							Image:   image,
							Command: cmd,
							Env: []corev1.EnvVar{
								{
									Name:  "LD_LIBRARY_PATH",
									Value: "/home/admin/oceanbase/lib",
								},
							},
						},
					},
					RestartPolicy: corev1.RestartPolicyNever,
				},
			},
			BackoffLimit: &backOffLimit,
		},
	}

	return job
}

func GeneratePodName(clusterName, name string) string {
	return fmt.Sprintf("%s-%s", clusterName, name)
}

func (ctrl *OBClusterCtrl) CreatePodForVersion(podName string) error {
	containerImage := fmt.Sprint(ctrl.OBCluster.Spec.ImageRepo, ":", ctrl.OBCluster.Spec.Tag)
	podObject := corev1.Pod{
		ObjectMeta: metav1.ObjectMeta{
			Name:      podName,
			Namespace: ctrl.OBCluster.Namespace,
		},
		Spec: corev1.PodSpec{
			Containers: []corev1.Container{
				{
					Name:  podName,
					Image: containerImage,
					Env: []corev1.EnvVar{
						{
							Name:  "LD_LIBRARY_PATH",
							Value: "/home/admin/oceanbase/lib",
						},
					},
				},
			},
			RestartPolicy: corev1.RestartPolicyNever,
		},
	}

	// create pod
	podExecuter := resource.NewPodResource(ctrl.Resource)
	err := podExecuter.Create(context.TODO(), podObject)
	if err != nil {
		if kubeerrors.IsAlreadyExists(err) {
			return nil
		}
		klog.Errorln("create pod to get version failed, error: ", err)
		return err
	}
	return nil
}

func (ctrl *OBClusterCtrl) GetPodIpByName(podName string) (string, error) {
	podExecuter := resource.NewPodResource(ctrl.Resource)
	podObject, err := podExecuter.Get(context.TODO(), ctrl.OBCluster.Namespace, podName)
	if err != nil {
		klog.Errorln("Get PodIp By PodName failed, err: ", err)
		return "", err
	}
	pod := podObject.(corev1.Pod)
	return pod.Status.PodIP, nil
}

func (ctrl *OBClusterCtrl) GetTargetVer() (string, error) {
	podName := GeneratePodName(myconfig.ClusterName, "help")
	err := ctrl.CreatePodForVersion(podName)
	if err != nil {
		return "", err
	}
	podIp, err := ctrl.GetPodIpByName(podName)
	if err != nil {
		return "", err
	}
	time.Sleep(1 * time.Second)
	return cable.OBServerGetVersion(podIp)
}

func (ctrl *OBClusterCtrl) GetUpgradeRoute(currentVer, targetVer string) ([]string, error) {
	var upgradeRoute []string
	podName := GeneratePodName(myconfig.ClusterName, "help")
	podIp, err := ctrl.GetPodIpByName(podName)
	if err != nil {
		return upgradeRoute, err
	}
	return cable.OBServerGetUpgradeRoute(podIp, currentVer, targetVer)
}

func (ctrl *OBClusterCtrl) getCurrentVersion(statefulApp cloudv1.StatefulApp) (string, error) {
	subsets := statefulApp.Status.Subsets
	for subsetsIdx, _ := range subsets {
		for _, pod := range subsets[subsetsIdx].Pods {
			return cable.OBServerGetVersion(pod.PodIP)
		}
	}
	return "", nil
}

func (ctrl *OBClusterCtrl) CheckTargetVersion(currentTargetVersion string) error {
	if currentTargetVersion == "" {
		targetVersion, err := ctrl.GetTargetVer()
		if err != nil {
			return err
		}
		klog.Infoln("OBCluster Upgrade Target Verson is ", targetVersion)
		upgradeInfo := model.UpgradeInfo{
			TargetVersion: targetVersion,
		}
		return ctrl.UpdateOBStatusForUpgrade(upgradeInfo)
	} // else if currentTargetVersion != targetVersion {
	// 	klog.Errorln("Can not upgrade OB to another version when current upgrading is not finished")
	// 	return errors.New("Can not upgrade OB to another version when current upgrading is not finished")
	// }
	return nil
}

func (ctrl *OBClusterCtrl) CheckUpgradeRoute(statefulApp cloudv1.StatefulApp, upgradeRoute []string, targetVer string) error {
	if upgradeRoute == nil {
		currentVer, err := ctrl.getCurrentVersion(statefulApp)
		if err != nil {
			return err
		}
		klog.Infoln("currentVer: ", currentVer)
		upgradeRoute, err = ctrl.GetUpgradeRoute(currentVer, targetVer)
		if err != nil {
			return err
		}
		klog.Infoln("OBCluster Upgrade Route is ", upgradeRoute)
		upgradeInfo := model.UpgradeInfo{
			UpgradeRoute: upgradeRoute,
		}
		return ctrl.UpdateOBStatusForUpgrade(upgradeInfo)
	}
	// podName := GeneratePodName(myconfig.ClusterName, "help")
	// podExecuter := resource.NewPodResource(ctrl.Resource)
	// podObject, err := podExecuter.Get(context.TODO(), ctrl.OBCluster.Namespace, podName)
	// if err != nil {
	// 	klog.Errorln("Get PodIp By PodName failed, err: ", err)
	// 	return err
	// }
	// return podExecuter.Delete(context.TODO(), podObject)
	return nil
}

func (ctrl *OBClusterCtrl) ExecUpgradePreChecker(statefulApp cloudv1.StatefulApp) error {
	name := "pre-checker"
	jobName := GenerateJobName(myconfig.ClusterName, name)
	containerImage := fmt.Sprint(ctrl.OBCluster.Spec.ImageRepo, ":", ctrl.OBCluster.Spec.Tag)

	rsIP, err := ctrl.GetRsIP(statefulApp)
	if err != nil {
		return err
	}
	var cmdList []string
	cmd := sql.ReplaceAll(sql.ExecCheckScriptsCMDTemplate, sql.UpgradeReplacer(observerconst.UpgradePreCheckerPath, rsIP, strconv.Itoa(observerconst.MysqlPort)))
	cmdList = append(cmdList, "bash", "-c", cmd)
	klog.Infoln("cmd: ", cmdList)
	jobObject := ctrl.GenerateJobObjectPcress(jobName, containerImage, cmdList)
	klog.Infoln("jobObject.(batchv1.Job) 2: ", jobObject)
	jobExecuter := resource.NewJobResource(ctrl.Resource)
	err = jobExecuter.Create(context.TODO(), jobObject)
	if err != nil {
		klog.Errorln("Create ", jobName, " job failed, err: ", err)
		return err
	}
	return ctrl.UpdateOBClusterAndZoneStatus(observerconst.UpgradeChecking, "", "")
}

func (ctrl *OBClusterCtrl) GetPreCheckJobStatus(statefulApp cloudv1.StatefulApp) error {
	name := "pre-checker"
	jobName := GenerateJobName(myconfig.ClusterName, name)
	jobExecuter := resource.NewJobResource(ctrl.Resource)
	jobObject, err := jobExecuter.Get(context.TODO(), ctrl.OBCluster.Namespace, jobName)
	if err != nil {
		if kubeerrors.IsNotFound(err) {
			// 是否需要跳转回去新建 job
		} else {
			klog.Errorln("Get ", jobName, " job failed, err: ", err)
			return err
		}
	}
	job := jobObject.(batchv1.Job)
	if job.Status.Succeeded == 0 && job.Status.Failed == 0 {
		return nil
	}
	if job.Status.Succeeded == 1 {
		err = ctrl.UpdateOBClusterAndZoneStatus(observerconst.NeedExecutingPreScripts, "", "")
	}
	if job.Status.Failed == 1 {
		err = ctrl.UpdateOBClusterAndZoneStatus(observerconst.ClusterReady, "", "")
	}
	if err != nil {
		return err
	}
	return jobExecuter.Delete(context.TODO(), jobObject)

}

func (ctrl *OBClusterCtrl) ExecPreScripts(statefulApp cloudv1.StatefulApp) error {
	clusterStatus := converter.GetClusterStatusFromOBTopologyStatus(ctrl.OBCluster.Status.Topology)
	upgradeRoute := clusterStatus.UpgradeRoute
	if upgradeRoute[len(upgradeRoute)-1] == clusterStatus.ScriptPassedVersion {
		return ctrl.UpdateOBClusterAndZoneStatus(observerconst.NeedUpgrading, "", "")
	}

	containerImage := fmt.Sprint(ctrl.OBCluster.Spec.ImageRepo, ":", ctrl.OBCluster.Spec.Tag)
	rsIP, err := ctrl.GetRsIP(statefulApp)
	if err != nil {
		return err
	}

	var version string
	var index int
	if clusterStatus.ScriptPassedVersion == "" {
		version = upgradeRoute[1]
		index = 1
	} else {
		for i, ver := range upgradeRoute {
			if ver == clusterStatus.ScriptPassedVersion {
				version = upgradeRoute[i+1]
				index = i + 1
			}
		}
	}
	jobName := GenerateJobName(myconfig.ClusterName, fmt.Sprint("exec-pre-scripts-", index))
	jobExecuter := resource.NewJobResource(ctrl.Resource)
	jobObject, err := jobExecuter.Get(context.TODO(), ctrl.OBCluster.Namespace, jobName)
	if err != nil {
		if kubeerrors.IsNotFound(err) {
			filename := fmt.Sprint(observerconst.UpgradeScriptsPath, version, observerconst.PreScriptFile)
			cmd := sql.ReplaceAll(sql.ExecCheckScriptsCMDTemplate, sql.UpgradeReplacer(filename, rsIP, strconv.Itoa(observerconst.MysqlPort)))
			var cmdList []string
			cmdList = append(cmdList, "bash", "-c", cmd)
			jobObject = ctrl.GenerateJobObjectPcress(jobName, containerImage, cmdList)
			err = jobExecuter.Create(context.TODO(), jobObject)
			if err != nil {
				klog.Errorln("Create ", jobName, " job failed, err: ", err)
				return err
			}
			return nil
		} else {
			klog.Errorln("Get ", jobName, " job failed, err: ", err)
			return err
		}
	}
	job := jobObject.(batchv1.Job)
	if job.Status.Succeeded == 0 && job.Status.Failed == 0 {
		return nil
	}
	if job.Status.Succeeded == 1 {
		upgradeInfo := model.UpgradeInfo{
			ScriptPassedVersion: version,
		}
		err = ctrl.UpdateOBStatusForUpgrade(upgradeInfo)
		if err != nil {
			return err
		}
	}
	return jobExecuter.Delete(context.TODO(), jobObject)
}

func (ctrl *OBClusterCtrl) PreparingForUpgrade(statefulApp cloudv1.StatefulApp) error {

	upgradeInfo := model.UpgradeInfo{
		ZoneStatus:    observerconst.NeedUpgrading,
		ClusterStatus: observerconst.Upgrading,
	}
	return ctrl.UpdateOBStatusForUpgrade(upgradeInfo)
}

func (ctrl *OBClusterCtrl) ExecUpgrading(statefulApp cloudv1.StatefulApp) error {

	clusterIP, err := ctrl.GetServiceClusterIPByName(ctrl.OBCluster.Namespace, ctrl.OBCluster.Name)
	// get svc failed
	if err != nil {
		return errors.New("failed to get service address")
	}
	zoneInfoMap := ctrl.GetInfoForUpgradeByZone()
	if zoneInfoMap[observerconst.NeedUpgrading] != nil {
		zoneName := zoneInfoMap[observerconst.NeedUpgrading][0]
		isZoneStop, err := ctrl.isOBZoneStop(zoneName)
		if err != nil {
			return err
		}
		if !isZoneStop {
			err = ctrl.StopZone(clusterIP, zoneName)
			if err != nil {
				klog.Infoln("StopOBZone err: ", err)
				return err
			}
		}

		isLeaderCountZero, err := ctrl.isLeaderCountZero(zoneName)
		if err != nil {
			return err
		}
		if isLeaderCountZero {
			return ctrl.PatchPods(zoneName, statefulApp)
		} else {
			return nil
		}
	}

	return nil
}

func (ctrl *OBClusterCtrl) PatchPods(zoneName string, statefulApp cloudv1.StatefulApp) error {
	subsets := statefulApp.Status.Subsets
	podExecuter := resource.NewPodResource(ctrl.Resource)
	for _, subset := range subsets {
		podList := subset.Pods
		for _, pod := range podList {
			podName := pod.Name
			podObject, err := podExecuter.Get(context.TODO(), ctrl.OBCluster.Namespace, podName)
			if err != nil {
				klog.Errorln("Get PodObject By PodName failed, err: ", err)
				return err
			}
			podObjectReal := podObject.(corev1.Pod)
			newPodObject := podObjectReal.DeepCopy()
			for idx, container := range newPodObject.Spec.Containers {
				klog.Infoln("idx, container ", idx, container)
				if container.Name == observerconst.ImgOb {
					newPodObject.Spec.Containers[idx].Image = fmt.Sprint(ctrl.OBCluster.Spec.ImageRepo, ":", ctrl.OBCluster.Spec.Tag)
					err = podExecuter.Patch(context.TODO(), *newPodObject, client.MergeFrom(podObjectReal.DeepCopyObject().(client.Object)))
					if err != nil {
						return err
					}
				}
			}
			return nil
		}
	}
	return nil
}

func (ctrl *OBClusterCtrl) isLeaderCountZero(zoneName string) (bool, error) {
	sqlOperator, err := ctrl.GetSqlOperator()
	if err != nil {
		return false, errors.Wrap(err, "get sql operator when get info add server by zone")
	}
	zoneLeaderCount := sqlOperator.GetLeaderCount()
	for _, zone := range zoneLeaderCount {
		if zone.Zone == zoneName {
			if zone.LeaderCount == 0 {
				return true, nil
			} else {
				return false, nil
			}
		}
	}
	return false, errors.New(fmt.Sprint("Can Not Get Zone Leader Count : ", zoneName))

}

func (ctrl *OBClusterCtrl) isOBZoneStop(zoneName string) (bool, error) {
	sqlOperator, err := ctrl.GetSqlOperator()
	if err != nil {
		return false, errors.Wrap(err, "get sql operator when get info add server by zone")
	}
	obZoneList := sqlOperator.GetOBZone()
	if len(obZoneList) == 0 {
		return false, errors.New(observerconst.DataBaseError)
	}

	for _, zone := range obZoneList {
		if zone.Zone == zoneName {
			if zone.Info == observerconst.OBZoneInactive {
				return true, nil
			}
			return false, nil
		}
	}
	return false, errors.New("Can Not Get Zone ")
}

func (ctrl *OBClusterCtrl) GetInfoForUpgradeByZone() map[string][]string {
	infoMap := make(map[string][]string)
	//var current []string
	clusterStatus := converter.GetClusterStatusFromOBTopologyStatus(ctrl.OBCluster.Status.Topology)
	for _, zone := range clusterStatus.Zone {
		if zone.ZoneStatus == observerconst.NeedUpgrading {
			infoMap[observerconst.NeedUpgrading] = append(infoMap[observerconst.NeedUpgrading], zone.Name)
			// if infoMap[observerconst.NeedUpgrading] != nil {
			// 	current = infoMap[observerconst.NeedUpgrading]
			// }
			// infoMap[observerconst.NeedUpgrading] = append(current, zone.Name)
		} else if zone.ZoneStatus == observerconst.Upgrading {
			infoMap[observerconst.Upgrading] = append(infoMap[observerconst.Upgrading], zone.Name)
			// if infoMap[observerconst.Upgrading] != nil {
			// 	current = infoMap[observerconst.Upgrading]
			// }
			// infoMap[observerconst.Upgrading] = append(current, zone.Name)
		}

	}
	return infoMap
}

func (ctrl *OBClusterCtrl) CheckUpgradeMode(statefulApp cloudv1.StatefulApp) error {
	sqlOperator, err := ctrl.GetSqlOperatorFromStatefulApp(statefulApp)
	if err != nil {
		klog.Errorln("Get Sql Operator From StatefulApp Failed, Err: ", err)
		return err
	}
	isOK := true
	zoneUpGradeMode := sqlOperator.GetUpgradeMode()
	for _, v := range zoneUpGradeMode {
		if v.Value == "False" {
			isOK = false
		}
	}
	if isOK {
		return ctrl.UpdateOBClusterAndZoneStatus(observerconst.ExecutingPreScripts, "", "")
	} else {
		return sqlOperator.BeginUpgrade()
	}
}

func (ctrl *OBClusterCtrl) GetRsIP(statefulApp cloudv1.StatefulApp) (string, error) {
	var rsIP string
	sqlOperator, err := ctrl.GetSqlOperatorFromStatefulApp(statefulApp)
	if err != nil {
		klog.Errorln("Get Sql Operator From StatefulApp Failed, Err: ", err)
		return rsIP, err
	}
	rsList := sqlOperator.GetRootService()
	for _, zone := range rsList {
		if zone.Role == 1 {
			rsIP = zone.SvrIP
			return rsIP, nil
		}
	}
	return rsIP, errors.New("Get RS IP Failed. Cannot Find RS")
}
