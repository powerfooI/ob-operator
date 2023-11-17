/*
Copyright (c) 2023 OceanBase
ob-operator is licensed under Mulan PSL v2.
You can use this software according to the terms and conditions of the Mulan PSL v2.
You may obtain a copy of Mulan PSL v2 at:
         http://license.coscl.org.cn/MulanPSL2
THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
See the Mulan PSL v2 for more details.
*/

package task

import (
	flowname "github.com/oceanbase/ob-operator/pkg/task/const/flow/name"
)

// register all task flows at init
func init() {
	// obcluster
	GetRegistry().Register(flowname.BootstrapOBCluster, BootstrapOBCluster)
	GetRegistry().Register(flowname.MaintainOBClusterAfterBootstrap, MaintainOBClusterAfterBootstrap)
	GetRegistry().Register(flowname.AddOBZone, AddOBZone)
	GetRegistry().Register(flowname.DeleteOBZone, DeleteOBZone)
	GetRegistry().Register(flowname.ModifyOBZoneReplica, ModifyOBZoneReplica)
	GetRegistry().Register(flowname.MaintainOBParameter, MaintainOBParameter)
	GetRegistry().Register(flowname.UpgradeOBCluster, UpgradeOBCluster)

	// obzone
	GetRegistry().Register(flowname.CreateOBZone, CreateOBZone)
	GetRegistry().Register(flowname.AddOBServer, AddOBServer)
	GetRegistry().Register(flowname.DeleteOBServer, DeleteOBServer)
	GetRegistry().Register(flowname.PrepareOBZoneForBootstrap, PrepareOBZoneForBootstrap)
	GetRegistry().Register(flowname.UpgradeOBZone, UpgradeOBZone)
	GetRegistry().Register(flowname.ForceUpgradeOBZone, ForceUpgradeOBZone)
	GetRegistry().Register(flowname.MaintainOBZoneAfterBootstrap, MaintainOBZoneAfterBootstrap)
	GetRegistry().Register(flowname.DeleteOBZoneFinalizer, DeleteOBZoneFinalizer)

	// observer
	GetRegistry().Register(flowname.CreateOBServer, CreateOBServer)
	GetRegistry().Register(flowname.PrepareOBServerForBootstrap, PrepareOBServerForBootstrap)
	GetRegistry().Register(flowname.MaintainOBServerAfterBootstrap, MaintainOBServerAfterBootstrap)
	GetRegistry().Register(flowname.DeleteOBServerFinalizer, DeleteOBServerFinalizer)
	GetRegistry().Register(flowname.UpgradeOBServer, UpgradeOBServer)
	GetRegistry().Register(flowname.RecoverOBServer, RecoverOBServer)
	GetRegistry().Register(flowname.AnnotateOBServerPod, AnnotateOBServerPod)
	GetRegistry().Register(flowname.AddServerInOB, AddServerInOB)

	// obtenant
	GetRegistry().Register(flowname.CreateTenant, CreateTenant)
	GetRegistry().Register(flowname.MaintainWhiteList, MaintainWhiteList)
	GetRegistry().Register(flowname.MaintainCharset, MaintainCharset)
	GetRegistry().Register(flowname.MaintainUnitNum, MaintainUnitNum)
	GetRegistry().Register(flowname.MaintainPrimaryZone, MaintainPrimaryZone)
	GetRegistry().Register(flowname.MaintainLocality, MaintainLocality)
	GetRegistry().Register(flowname.AddPool, AddPool)
	GetRegistry().Register(flowname.DeletePool, DeletePool)
	GetRegistry().Register(flowname.MaintainUnitConfig, MaintainUnitConfig)
	GetRegistry().Register(flowname.DeleteTenant, DeleteTenant)

	GetRegistry().Register(flowname.RestoreTenant, RestoreTenant)
	GetRegistry().Register(flowname.CancelRestoreFlow, CancelRestoreJob)
	GetRegistry().Register(flowname.CreateEmptyStandbyTenant, CreateEmptyStandbyTenant)

	// tenant-level backup
	GetRegistry().Register(flowname.PrepareBackupPolicy, PrepareBackupPolicy)
	GetRegistry().Register(flowname.StartBackupJob, StartBackupJob)
	GetRegistry().Register(flowname.StopBackupPolicy, StopBackupPolicy)
	GetRegistry().Register(flowname.MaintainRunningPolicy, MaintainRunningPolicy)
	GetRegistry().Register(flowname.PauseBackup, PauseBackup)
	GetRegistry().Register(flowname.ResumeBackup, ResumeBackup)

	GetRegistry().Register(flowname.CreateBackupJobInDB, CreateBackupJobInDB)

	// obparameter
	GetRegistry().Register(flowname.SetOBParameter, SetOBParameter)

	// tenant-level restore
	GetRegistry().Register(flowname.StartRestoreFlow, StartRestoreJob)
	GetRegistry().Register(flowname.RestoreAsPrimaryFlow, RestoreAsPrimary)
	GetRegistry().Register(flowname.RestoreAsStandbyFlow, RestoreAsStandby)

	// tenant operation
	GetRegistry().Register(flowname.ChangeTenantRootPasswordFlow, ChangeTenantRootPassword)
	GetRegistry().Register(flowname.ActivateStandbyTenantFlow, ActivateStandbyTenantOp)
	GetRegistry().Register(flowname.SwitchoverTenantsFlow, SwitchoverTenants)
	GetRegistry().Register(flowname.RevertSwitchoverTenantsFlow, RevertSwitchoverTenants)
}