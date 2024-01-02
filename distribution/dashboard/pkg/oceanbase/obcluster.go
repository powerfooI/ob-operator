package oceanbase

import (
	"context"
	"fmt"

	"github.com/oceanbase/ob-operator/api/v1alpha1"
	oceanbaseconst "github.com/oceanbase/ob-operator/pkg/const/oceanbase"
	"github.com/oceanbase/oceanbase-dashboard/pkg/k8s/client"
	"github.com/oceanbase/oceanbase-dashboard/pkg/oceanbase/schema"
	"github.com/pkg/errors"
	logger "github.com/sirupsen/logrus"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
)

const (
	PasswordKey = "password"
)

// TODO: generate random password
func generatePassword() string {
	return "pass"
}

func createPasswordSecret(namespace, name, password string) error {
	client := client.GetClient()
	stringData := make(map[string]string)
	stringData[PasswordKey] = password
	secret := &corev1.Secret{
		ObjectMeta: metav1.ObjectMeta{
			Namespace: namespace,
			Name:      name,
		},
		Type:       "Opaque",
		StringData: stringData,
	}
	_, err := client.ClientSet.CoreV1().Secrets(namespace).Create(context.TODO(), secret, metav1.CreateOptions{})
	return err
}

func CreateSecretsForOBCluster(obcluster *v1alpha1.OBCluster, rootPass string) error {
	logger.Info("Create secrets for obcluster")
	err := createPasswordSecret(obcluster.Namespace, obcluster.Spec.UserSecrets.Root, rootPass)
	if err != nil {
		return errors.Wrap(err, "Create secret for user root")
	}
	err = createPasswordSecret(obcluster.Namespace, obcluster.Spec.UserSecrets.Monitor, generatePassword())
	if err != nil {
		return errors.Wrap(err, "Create secret for user monitor")
	}
	err = createPasswordSecret(obcluster.Namespace, obcluster.Spec.UserSecrets.ProxyRO, generatePassword())
	if err != nil {
		return errors.Wrap(err, "Create secret for user proxyro")
	}
	err = createPasswordSecret(obcluster.Namespace, obcluster.Spec.UserSecrets.Operator, generatePassword())
	if err != nil {
		return errors.Wrap(err, "Create secret for user operator")
	}
	return nil
}

func CreateOBCluster(obcluster *v1alpha1.OBCluster) error {
	logger.Infof("create obcluster with instance: %v", obcluster)
	client := client.GetClient()
	objectMap, err := runtime.DefaultUnstructuredConverter.ToUnstructured(obcluster)
	if err != nil {
		return errors.Wrap(err, "Convert obcluster to unsturctured")
	}
	unstructuredObj := &unstructured.Unstructured{
		Object: objectMap,
	}
	unstructuredObj.SetGroupVersionKind(schema.OBClusterResKind)
	logger.Infof("create obcluster with unstructured: %v", unstructuredObj)
	_, err = client.DynamicClient.Resource(schema.OBClusterRes).Namespace(obcluster.Namespace).Create(context.TODO(), unstructuredObj, metav1.CreateOptions{})
	return err
}

func UpdateOBCluster(obcluster *v1alpha1.OBCluster) error {
	client := client.GetClient()
	unstructuredObj, err := runtime.DefaultUnstructuredConverter.ToUnstructured(obcluster)
	if err != nil {
		return errors.Wrap(err, "Convert obcluster to unstructured")
	}
	_, err = client.DynamicClient.Resource(schema.OBClusterRes).Namespace(obcluster.Namespace).Update(context.TODO(), &unstructured.Unstructured{
		Object: unstructuredObj,
	}, metav1.UpdateOptions{})
	return err
}

func GetOBCluster(namespace, name string) (*v1alpha1.OBCluster, error) {
	client := client.GetClient()
	obj, err := client.DynamicClient.Resource(schema.OBClusterRes).Namespace(namespace).Get(context.TODO(), name, metav1.GetOptions{})
	if err != nil {
		return nil, err
	}
	var obcluster v1alpha1.OBCluster
	err = runtime.DefaultUnstructuredConverter.FromUnstructured(obj.UnstructuredContent(), &obcluster)
	if err != nil {
		return nil, err
	}
	return &obcluster, nil
}

func DeleteOBCluster(namespace, name string) error {
	client := client.GetClient()
	err := client.DynamicClient.Resource(schema.OBClusterRes).Namespace(namespace).Delete(context.TODO(), name, metav1.DeleteOptions{})
	return err
}

func ListAllOBClusters() (*v1alpha1.OBClusterList, error) {
	client := client.GetClient()
	obj, err := client.DynamicClient.Resource(schema.OBClusterRes).List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		return nil, err
	}
	var obclusterList v1alpha1.OBClusterList
	err = runtime.DefaultUnstructuredConverter.FromUnstructured(obj.UnstructuredContent(), &obclusterList)
	if err != nil {
		return nil, err
	}
	return &obclusterList, nil
}

func ListOBZonesOfOBCluster(obcluster *v1alpha1.OBCluster) (*v1alpha1.OBZoneList, error) {
	client := client.GetClient()
	var obzoneList v1alpha1.OBZoneList
	obj, err := client.DynamicClient.Resource(schema.OBZoneRes).Namespace(obcluster.Namespace).List(context.TODO(), metav1.ListOptions{
		LabelSelector: fmt.Sprintf("%s=%s", oceanbaseconst.LabelRefOBCluster, obcluster.Name),
	})
	if err != nil {
		return nil, errors.Wrap(err, "List obzones")
	}
	err = runtime.DefaultUnstructuredConverter.FromUnstructured(obj.UnstructuredContent(), &obzoneList)
	return &obzoneList, nil
}

func ListOBServersOfOBZone(obzone *v1alpha1.OBZone) (*v1alpha1.OBServerList, error) {
	client := client.GetClient()
	var observerList v1alpha1.OBServerList
	logger.Infof("get observer list of obzone %s", obzone.Name)
	obj, err := client.DynamicClient.Resource(schema.OBServerRes).Namespace(obzone.Namespace).List(context.TODO(), metav1.ListOptions{
		LabelSelector: fmt.Sprintf("%s=%s", oceanbaseconst.LabelRefOBZone, obzone.Name),
	})
	if err != nil {
		return nil, errors.Wrap(err, "List observers")
	}
	err = runtime.DefaultUnstructuredConverter.FromUnstructured(obj.UnstructuredContent(), &observerList)
	return &observerList, nil
}
