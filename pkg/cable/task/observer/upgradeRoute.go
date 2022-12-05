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

package observer

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"

	mapset "github.com/deckarep/golang-set"
	log "github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"
)

type OBUpgradeRouteProcessParam struct {
	CurrentVersion string `json:"currentVersion" binding:"required"`
	TargetVersion  string `json:"targetVersion" binding:"required"`
	FilePath       string `json:"filePath" binding:"required"`
}

type VersionDep struct {
	Version           string        `yaml:"version"`
	CanBeUpgradedTo   []string      `yaml:"can_be_upgraded_to,flow,omitempty"`
	RequireFromBinary bool          `yaml:"require_from_binary,flow,omitempty"`
	Deprecated        bool          `yaml:"deprecated,omitempty"`
	DirectComeFrom    []*VersionDep `yaml:"directComeFrom,omitempty"`
	Next              []*VersionDep `yaml:"next,omitempty"`
	Precursor         *VersionDep   `yaml:"precursor,omitempty"`
	DirectUpgrade     bool          `yaml:"directUpgrade,omitempty"`
}

func GetOBUpgradeRouteProcess(param OBUpgradeRouteProcessParam) ([]string, error) {
	currentVersion := param.CurrentVersion
	targetVersion := param.TargetVersion
	filePath := param.FilePath
	log.Infof("Upgrade Route Process Params: ", currentVersion, targetVersion, filePath)

	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, errors.New(fmt.Sprint("cannot find file: ", filePath))
		}
		log.Infof("cat not read file: ", filePath, err)
		return nil, err
	}
	var versionDep []VersionDep
	err = yaml.Unmarshal(content, &versionDep)
	if err != nil {
		log.Infof("Failed to parse file ", err)
	}
	graph := Build(versionDep)
	res := FindShortestUpgradePath(graph, currentVersion, targetVersion)
	var upgradeRoute []string
	for _, v := range res {
		upgradeRoute = append(upgradeRoute, v.Version)
	}
	return upgradeRoute, nil
}

func Build(versionDep []VersionDep) map[string]*VersionDep {
	nodeMap := make(map[string]*VersionDep)
	for index := range versionDep {
		node := versionDep[index]
		nodeMap[node.Version] = &node
	}
	for index := range versionDep {
		node := &versionDep[index]
		node = nodeMap[node.Version]
		nodeMap = BuildNeighbours(nodeMap, node, node.CanBeUpgradedTo, false)
		nodeMap = BuildNeighbours(nodeMap, node, node.CanBeUpgradedTo, true)
	}
	return nodeMap
}

func BuildNeighbours(nodeMap map[string]*VersionDep, current *VersionDep, neighborVersions []string, direct bool) map[string]*VersionDep {
	for _, k := range neighborVersions {
		var node *VersionDep
		if nodeMap[k] == nil {
			node = &VersionDep{
				Version: k,
			}
		} else {
			node = nodeMap[k]
		}
		if direct {
			node.DirectComeFrom = append(node.DirectComeFrom, node)
		}
		current.Next = append(current.Next, node)
	}
	return nodeMap
}

func FindShortestUpgradePath(nodeMap map[string]*VersionDep, currentVersion, targetVersion string) []VersionDep {
	startNode := nodeMap[currentVersion]
	var queue []*VersionDep
	queue = append(queue, startNode)
	visited := mapset.NewSet(startNode)
	var finalNode *VersionDep
	for k := range nodeMap {
		nodeMap[k].Precursor = nil
	}
	for {
		if len(queue) <= 0 {
			break
		}
		node := queue[len(queue)-1]
		queue = queue[0 : len(queue)-1]
		if node.Version == targetVersion {
			flag := false
			for k := range node.Next {
				v := node.Next[k]
				if !visited.Contains(v) && v.Version == targetVersion {
					flag = true
					v.Precursor = node
					queue = append(queue, v)
					visited.Add(v)
				}
			}
			if !flag {
				finalNode = node
			}
		} else {
			for k := range node.Next {
				v := node.Next[k]
				if !visited.Contains(v) {
					v.Precursor = node
					queue = append(queue, v)
					visited.Add(v)
					log.Println("visited", v.Version, len(v.Next))
				}
			}
		}
		if finalNode != nil {
			break
		}
	}

	p := finalNode
	var res []VersionDep
	for {
		if p == nil {
			break
		}
		res = append([]VersionDep{*p}, res...)
		pre := p.Precursor
		for {
			if pre != nil && p.Precursor.Version != "" && p.Version == pre.Version {
				pre = p.Precursor
			} else {
				break
			}
		}
		p = pre
	}
	n := len(res)
	i := 1
	for {
		if i < n {
			node := res[i]
			pre := res[i-1]
			for _, v := range node.DirectComeFrom {
				if v.Version == pre.Version {
					node.DirectUpgrade = true
				}
			}
			i += 1
		} else {
			break
		}
	}
	if len(res) == 1 {
		res = append([]VersionDep{*startNode}, res...)
	}
	return res
}
