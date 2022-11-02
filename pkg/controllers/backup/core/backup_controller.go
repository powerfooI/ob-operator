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
	"time"

	"k8s.io/apimachinery/pkg/runtime"

	cloudv1 "github.com/oceanbase/ob-operator/apis/cloud/v1"
	myconfig "github.com/oceanbase/ob-operator/pkg/config"
	backupconst "github.com/oceanbase/ob-operator/pkg/controllers/backup/const"
	"github.com/oceanbase/ob-operator/pkg/controllers/backup/sql"
	observerconst "github.com/oceanbase/ob-operator/pkg/controllers/observer/const"
	"github.com/oceanbase/ob-operator/pkg/controllers/observer/core/converter"
	"github.com/oceanbase/ob-operator/pkg/infrastructure/kube/resource"
	"github.com/pkg/errors"
	corev1 "k8s.io/api/core/v1"
	kubeerrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/client-go/tools/record"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
)

// BackupReconciler reconciles a backup object
type BackupReconciler struct {
	CRClient client.Client
	Scheme   *runtime.Scheme

	Recorder record.EventRecorder
}

type BackupCtrl struct {
	Resource *resource.Resource
	Backup   cloudv1.Backup
}

type BackupCtrlOperator interface {
	BackupCoordinator() (ctrl.Result, error)
}

// +kubebuilder:rbac:groups=cloud.oceanbase.com,resources=backups,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=cloud.oceanbase.com,resources=backups/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=cloud.oceanbase.com,resources=backups/finalizers,verbs=update
// +kubebuilder:rbac:groups="",resources=services,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups="",resources=services/status,verbs=get;update;patch
// +kubebuilder:rbac:groups="",resources=services/finalizers,verbs=update
// +kubebuilder:rbac:groups="",resources=secrets,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups="",resources=secrets/status,verbs=get;update;patch
// +kubebuilder:rbac:groups="",resources=secrets/finalizers,verbs=update
// +kubebuilder:rbac:groups="",resources=events,verbs=create;patch

func (r *BackupReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// Fetch the CR instance
	instance := &cloudv1.Backup{}
	err := r.CRClient.Get(ctx, req.NamespacedName, instance)
	if err != nil {
		if kubeerrors.IsNotFound(err) {
			// Object not found, return.
			// Created objects are automatically garbage collected.
			return reconcile.Result{}, nil
		}
		// Error reading the object, requeue the request.
		return reconcile.Result{}, err
	}
	// custom logic
	backupCtrl := NewBackupCtrl(r.CRClient, r.Recorder, *instance)
	return backupCtrl.BackupCoordinator()
}

func NewBackupCtrl(client client.Client, recorder record.EventRecorder, backup cloudv1.Backup) BackupCtrlOperator {
	ctrlResource := resource.NewResource(client, recorder)
	return &BackupCtrl{
		Resource: ctrlResource,
		Backup:   backup,
	}
}

func (ctrl *BackupCtrl) BackupCoordinator() (ctrl.Result, error) {
	// Backup control-plan
	err := ctrl.BackupEffector()
	if err != nil {
		return reconcile.Result{}, err
	}

	return reconcile.Result{}, nil
}

func (ctrl *BackupCtrl) BackupEffector() error {
	var err error
	backupSets := ctrl.Backup.Status.BackupSet
	isExist := false
	for _, backupSet := range backupSets {
		if backupSet.ClusterName == myconfig.ClusterName {
			isExist = true
			err = ctrl.UpdateBackupSetStatus()
		}
	}
	if !isExist {
		err = ctrl.BuildBackupTask()
	}
	return err
}

func (ctrl *BackupCtrl) BuildBackupTask() error {
	// set dest path
	dest_path := ctrl.Backup.Spec.DestPath
	err := ctrl.SetBackupDest(dest_path)
	if err != nil {
		return err
	}

	err = ctrl.setBackupLogArchiveOption()
	if err != nil {
		return err
	}

	err = ctrl.setBackupLogArchive()
	if err != nil {
		return err
	}

	err = ctrl.setBackupLogArchive()
	if err != nil {
		return err
	}

	for _, schedule := range ctrl.Backup.Spec.Schedule {
		// deal with full backup
		if schedule.BackupType == backupconst.FullBackup {
			// full backup once
			if schedule.Schedule == backupconst.BackupOnce {
				isBackupRunning := ctrl.isBackupRunning()
				if !isBackupRunning {
					err = ctrl.StartBackupDatabase()
					if err != nil {
						return err
					}
				}
				//full backup, periodic
			} else {
				schedule, err := ctrl.getBackupSchedule(backupconst.FullBackup)
				if err != nil {
					return err
				}

				// first time to backup
				// TODO
				nextTime, err := time.Parse("2006-01-02 15:04:05", schedule.NextTime)
				if schedule.Schedule == "" || nextTime != time.Now() {
					nextTime := ctrl.getNextCron(schedule.Schedule)
					err = ctrl.UpdateBackupScheduleStatus(nextTime, backupconst.FullBackup)
					if err != nil {
						return err
					}
				} else {
					if nextTime.Before(time.Now()) || nextTime.Equal(time.Now()) {
						err = ctrl.StartBackupDatabase()
						if err != nil {
							return err
						}
						nextTime := ctrl.getNextCron(schedule.Schedule)
						err = ctrl.UpdateBackupScheduleStatus(nextTime, backupconst.FullBackup)
						if err != nil {
							return err
						}
					}
				}
			}

		}
		// deal with incremental backup
		if schedule.BackupType == backupconst.IncrementalBackup {
			// incremental backup once
			if schedule.Schedule == backupconst.BackupOnce {
				isBackupRunning := ctrl.isBackupRunning()
				if !isBackupRunning {
					err = ctrl.StartBackupIncremental()
					if err != nil {
						return err
					}
				}
				// incremental backup, periodic
			} else {
				schedule, err := ctrl.getBackupSchedule(backupconst.IncrementalBackup)
				if err != nil {
					return err
				}

				// first time to backup
				nextTime, err := time.Parse("2006-01-02 15:04:05", schedule.NextTime)
				if schedule.Schedule == "" || nextTime == time.Now() {
					nextTime := ctrl.getNextCron(schedule.Schedule)
					err = ctrl.UpdateBackupScheduleStatus(nextTime, backupconst.IncrementalBackup)
					if err != nil {
						return err
					}
				} else {
					if nextTime.Before(time.Now()) || nextTime.Equal(time.Now()) {
						err = ctrl.StartBackupIncremental()
						if err != nil {
							return err
						}
						nextTime := ctrl.getNextCron(schedule.Schedule)
						err = ctrl.UpdateBackupScheduleStatus(nextTime, backupconst.IncrementalBackup)
					}
				}

				nextTime = ctrl.getNextCron(schedule.Schedule)
				err = ctrl.UpdateBackupScheduleStatus(nextTime, backupconst.IncrementalBackup)
				if err != nil {
					return err
				}
			}
		}
	}
	return err
}

func (ctrl *BackupCtrl) GetSqlOperator() (*sql.SqlOperator, error) {
	clusterIP, err := ctrl.GetServiceClusterIPByName(ctrl.Backup.Namespace, ctrl.Backup.Spec.SourceCluster.ClusterName)
	// get svc failed
	if err != nil {
		return nil, errors.New("failed to get service address")
	}
	secretName := converter.GenerateSecretNameForDBUser(ctrl.Backup.Spec.SourceCluster.ClusterName, "sys", "admin")
	secretExecutor := resource.NewSecretResource(ctrl.Resource)
	secret, err := secretExecutor.Get(context.TODO(), ctrl.Backup.Namespace, secretName)
	user := "root"
	password := ""
	if err == nil {
		user = "admin"
		password = string(secret.(corev1.Secret).Data["password"])
	}

	p := &sql.DBConnectProperties{
		IP:       clusterIP,
		Port:     observerconst.MysqlPort,
		User:     user,
		Password: password,
		Database: "oceanbase",
		Timeout:  10,
	}
	so := sql.NewSqlOperator(p)
	if so.TestOK() {
		return so, nil
	}
	return nil, errors.New("failed to get sql operator")
}

func (ctrl *BackupCtrl) GetServiceClusterIPByName(namespace, name string) (string, error) {
	svcName := converter.GenerateServiceName(name)
	serviceExecuter := resource.NewServiceResource(ctrl.Resource)
	svc, err := serviceExecuter.Get(context.TODO(), namespace, svcName)
	if err != nil {
		return "", err
	}
	return svc.(corev1.Service).Spec.ClusterIP, nil
}
