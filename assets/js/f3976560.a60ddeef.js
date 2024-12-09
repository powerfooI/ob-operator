"use strict";(self.webpackChunkdocsite=self.webpackChunkdocsite||[]).push([[7795],{8769:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=s(4848),t=s(8453);const o={title:"Introduction"},a="ob-operator",i={type:"mdx",permalink:"/ob-operator/",source:"@site/src/pages/index.md",title:"Introduction",description:"ob-operator is a Kubernetes operator that simplifies the deployment and management of OceanBase cluster and related resources on Kubernetes.",frontMatter:{title:"Introduction"},unlisted:!1},l={},c=[{value:"Quick Start",id:"quick-start",level:2},{value:"Prerequisites",id:"prerequisites",level:3},{value:"Deploy ob-operator",id:"deploy-ob-operator",level:3},{value:"Using YAML configuration file",id:"using-yaml-configuration-file",level:4},{value:"Using Helm chart",id:"using-helm-chart",level:4},{value:"Using terraform",id:"using-terraform",level:4},{value:"Verify deployment",id:"verify-deployment",level:4},{value:"Deploy OceanBase Cluster",id:"deploy-oceanbase-cluster",level:3},{value:"Connecting to the OceanBase Cluster",id:"connecting-to-the-oceanbase-cluster",level:3},{value:"OceanBase Dashboard",id:"oceanbase-dashboard",level:3},{value:"Project Architecture",id:"project-architecture",level:2},{value:"Features",id:"features",level:2},{value:"Storage Compatibility",id:"storage-compatibility",level:2},{value:"Supported OceanBase Versions",id:"supported-oceanbase-versions",level:2},{value:"Development requirements",id:"development-requirements",level:2},{value:"Documents",id:"documents",level:2},{value:"Getting Help",id:"getting-help",level:2},{value:"Contributing",id:"contributing",level:2},{value:"License",id:"license",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",input:"input",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"ob-operator",children:"ob-operator"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"ob-operator"})," is a Kubernetes operator that simplifies the deployment and management of OceanBase cluster and related resources on Kubernetes."]}),"\n",(0,r.jsx)(n.h2,{id:"quick-start",children:"Quick Start"}),"\n",(0,r.jsx)(n.p,{children:"This section provides a step-by-step guide on how to use ob-operator to deploy an OceanBase cluster."}),"\n",(0,r.jsx)(n.h3,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsx)(n.p,{children:"Before getting started, please ensure you have a functional Kubernetes cluster with at least 2 CPU cores, 10GB of memory, and 100GB of storage space available."}),"\n",(0,r.jsxs)(n.p,{children:["ob-operator relies on ",(0,r.jsx)(n.a,{href:"https://cert-manager.io/docs/",children:"cert-manager"})," for certificate management. For instructions on installing cert-manager, please refer to the corresponding ",(0,r.jsx)(n.a,{href:"https://cert-manager.io/docs/installation/",children:"installation"})," documentation.\nIf you have trouble accessing ",(0,r.jsx)(n.code,{children:"quay.io"})," image registry, our mirrored cert-manager manifests can be applied through following command:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.3.1_release/deploy/cert-manager.yaml\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Storage of OceanBase cluster in this example relies on ",(0,r.jsx)(n.a,{href:"https://github.com/rancher/local-path-provisioner",children:"local-path-provisioner"}),", which should be installed beforehand. You should confirm that there is enough disk space in storage destination of local-path-provisioner.If you decide to deploy OceanBase cluster in production environment, it is recommended to use other storage solutions. We have provided a compatible table for storage solutions that we tested in section ",(0,r.jsx)(n.a,{href:"#storage-compatibility",children:"Storage Compatibility"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"deploy-ob-operator",children:"Deploy ob-operator"}),"\n",(0,r.jsx)(n.h4,{id:"using-yaml-configuration-file",children:"Using YAML configuration file"}),"\n",(0,r.jsx)(n.p,{children:"You can deploy ob-operator in a Kubernetes cluster by executing the following command:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Stable"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.3.1_release/deploy/operator.yaml\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Development"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/master/deploy/operator.yaml\n"})}),"\n",(0,r.jsx)(n.h4,{id:"using-helm-chart",children:"Using Helm chart"}),"\n",(0,r.jsx)(n.p,{children:"Helm Chart parameterizes the namespace in which ob-operator is deployed, allowing you to specify the namespace before installing ob-operator."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"helm repo add ob-operator https://oceanbase.github.io/ob-operator/\nhelm repo update\nhelm install ob-operator ob-operator/ob-operator --namespace=oceanbase-system --create-namespace\n"})}),"\n",(0,r.jsx)(n.h4,{id:"using-terraform",children:"Using terraform"}),"\n",(0,r.jsxs)(n.p,{children:["The required configuration files are conveniently located within the ",(0,r.jsx)(n.code,{children:"deploy/terraform"})," directory of our repository."]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["Generate Configuration Variables:\nTo begin, you'll need to generate a ",(0,r.jsx)(n.code,{children:"terraform.tfvars"})," file, which will hold the configuration specifics of your Kubernetes cluster. Use the following commands to create this file."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"cd deploy/terraform\n./generate_k8s_cluster_tfvars.sh\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsx)(n.li,{children:"Initialize Terraform:\nThis step will ensure that Terraform has all the necessary plugins and modules to manage the resources. Use the following command to initialize the terraform environment."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"terraform init\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsx)(n.li,{children:"Apply Configuration:\nThe final step is to deploy ob-operator. Execute the following command and Terraform will begin the deployment process"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"terraform apply\n"})}),"\n",(0,r.jsx)(n.h4,{id:"verify-deployment",children:"Verify deployment"}),"\n",(0,r.jsx)(n.p,{children:"After deployment/installation is complete, you can use the following command to verify if ob-operator is deployed successfully:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"kubectl get pod -n oceanbase-system\n\n# desired output\nNAME                                            READY   STATUS    RESTARTS   AGE\noceanbase-controller-manager-86cfc8f7bf-4hfnj   2/2     Running   0          1m\n"})}),"\n",(0,r.jsx)(n.h3,{id:"deploy-oceanbase-cluster",children:"Deploy OceanBase Cluster"}),"\n",(0,r.jsx)(n.p,{children:"Before creating an OceanBase cluster, you need to create necessary secret to store specific user's password for OceanBase."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"kubectl create secret generic root-password --from-literal=password='root_password'\n"})}),"\n",(0,r.jsx)(n.p,{children:"You can deploy OceanBase in a Kubernetes cluster by executing the following command:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.3.1_release/example/quickstart/obcluster.yaml\n"})}),"\n",(0,r.jsx)(n.p,{children:'It generally takes around 2 minutes to bootstrap a cluster. Execute the following command to check the status of the cluster. Once the cluster status changes to "running," it indicates that the cluster has been successfully created and bootstrapped:'}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"kubectl get obclusters.oceanbase.oceanbase.com test\n\n# desired output\nNAME   STATUS    AGE\ntest   running   6m2s\n"})}),"\n",(0,r.jsx)(n.h3,{id:"connecting-to-the-oceanbase-cluster",children:"Connecting to the OceanBase Cluster"}),"\n",(0,r.jsxs)(n.p,{children:["Use the following command to find the POD IP of the observer. The naming convention for PODs is ",(0,r.jsx)(n.code,{children:"${cluster_name}-${cluster_id}-${zone}-uuid"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"kubectl get pods -o wide\n"})}),"\n",(0,r.jsx)(n.p,{children:"To connect, use the following command:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"mysql -h{POD_IP} -P2881 -uroot -proot_password oceanbase -A -c\n"})}),"\n",(0,r.jsx)(n.h3,{id:"oceanbase-dashboard",children:"OceanBase Dashboard"}),"\n",(0,r.jsxs)(n.p,{children:["We are excited to unveil our innovative OceanBase Kubernetes Dashboard, a pioneering tool designed to enhance your experience with managing and monitoring OceanBase clusters on Kubernetes. We are proud to offer this amazing tool to our users and will actively work on new features and enhancements for future updates. ",(0,r.jsx)(n.a,{href:"/docs/dashboard/quickstart",children:"Quick Start"})," guide is available to help you get started with OceanBase Dashboard."]}),"\n",(0,r.jsx)(n.p,{children:"Deploy OceanBase Dashboard is pretty simple, just run the following commands:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"helm repo add ob-operator https://oceanbase.github.io/ob-operator/\nhelm repo update ob-operator\nhelm install oceanbase-dashboard ob-operator/oceanbase-dashboard\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"oceanbase-dashboard-install",src:s(155).A+"",width:"1679",height:"786"})}),"\n",(0,r.jsx)(n.p,{children:"After OceanBase Dashboard is successfully installed, a default user admin is created with a random password, you can check the password using the command printed after installation."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"echo $(kubectl get -n default secret oceanbase-dashboard-user-credentials -o jsonpath='{.data.admin}' | base64 -d)\n"})}),"\n",(0,r.jsx)(n.p,{children:"A service of type NodePort is created by default, you can check the address and port and open it in browser."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"kubectl get svc oceanbase-dashboard-oceanbase-dashboard\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"oceanbase-dashboard-service",src:s(1695).A+"",width:"1478",height:"110"})}),"\n",(0,r.jsx)(n.p,{children:"Login with admin user and password."}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.img,{alt:"oceanbase-dashboard-overview",src:s(9133).A+"",width:"3392",height:"2308"}),"\n",(0,r.jsx)(n.img,{alt:"oceanbase-dashboard-topology",src:s(3631).A+"",width:"3392",height:"1412"})]}),"\n",(0,r.jsx)(n.h2,{id:"project-architecture",children:"Project Architecture"}),"\n",(0,r.jsx)(n.p,{children:"ob-operator is built on top of kubebuilder and provides control and management of OceanBase clusters and related applications through a unified resource manager interface, a global task manager instance, and a task flow mechanism for handling long-running tasks. The architecture diagram of ob-operator is approximately as follows:"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"ob-operator Architecture",src:s(2818).A+"",width:"2256",height:"2409"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"ob-operator Task Manager Architecture",src:s(6186).A+"",width:"4079",height:"2117"})}),"\n",(0,r.jsxs)(n.p,{children:["For more detailed information about the architecture, please refer to the ",(0,r.jsx)(n.a,{href:"/docs/developer/arch",children:"Architecture"})," Document."]}),"\n",(0,r.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,r.jsx)(n.p,{children:"It provides various functionalities for managing OceanBase clusters, tenants, backup and recovery, and fault recovery. Specifically, ob-operator supports the following features:"}),"\n",(0,r.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,r.jsxs)(n.li,{className:"task-list-item",children:[(0,r.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," ","Cluster Management: Bootstrap the cluster, adjust cluster topology, support K8s topology configuration, scale-in/out, cluster upgrade, modify parameters."]}),"\n",(0,r.jsxs)(n.li,{className:"task-list-item",children:[(0,r.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," ","Tenant Management: Create tenants, adjust tenant topology, manage resource units, modify user passwords."]}),"\n",(0,r.jsxs)(n.li,{className:"task-list-item",children:[(0,r.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," ","Backup and Recovery: Periodically backup data to OSS or NFS destinations, restore data from OSS or NFS."]}),"\n",(0,r.jsxs)(n.li,{className:"task-list-item",children:[(0,r.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," ","Physical Standby: Restore standby tenant from backup, create empty standby tenant, activate standby tenant to primary, primary-standby switchover."]}),"\n",(0,r.jsxs)(n.li,{className:"task-list-item",children:[(0,r.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," ","Fault Recovery: Single node fault recovery, cluster-wide fault recovery with IP preservation."]}),"\n",(0,r.jsxs)(n.li,{className:"task-list-item",children:[(0,r.jsx)(n.input,{type:"checkbox",checked:!0,disabled:!0})," ","Dashboard(GUI): A web-based graphical management tool for OceanBase clusters based on ob-operator."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"storage-compatibility",children:"Storage Compatibility"}),"\n",(0,r.jsx)(n.p,{children:"We have tested ob-operator with the following storage solutions:"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Storage Solution"}),(0,r.jsx)(n.th,{children:"Tested Version"}),(0,r.jsx)(n.th,{children:"Compatibility"}),(0,r.jsx)(n.th,{children:"Notes"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"local-path-provisioner"}),(0,r.jsx)(n.td,{children:"0.0.23"}),(0,r.jsx)(n.td,{children:"\u2705"}),(0,r.jsx)(n.td,{children:"Recommended for development and testing"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Rook CephFS"}),(0,r.jsx)(n.td,{children:"v1.6.7"}),(0,r.jsx)(n.td,{children:"\u274c"}),(0,r.jsxs)(n.td,{children:["CephFS does not support ",(0,r.jsx)(n.code,{children:"fallocate"})," sys call"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Rook RBD (Block)"}),(0,r.jsx)(n.td,{children:"v1.6.7"}),(0,r.jsx)(n.td,{children:"\u2705"}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"OpenEBS (cStor)"}),(0,r.jsx)(n.td,{children:"v3.6.0"}),(0,r.jsx)(n.td,{children:"\u2705"}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"GlusterFS"}),(0,r.jsx)(n.td,{children:"v1.2.0"}),(0,r.jsx)(n.td,{children:"\u2753"}),(0,r.jsx)(n.td,{children:"Requires kernel version >= 5.14"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Longhorn"}),(0,r.jsx)(n.td,{children:"v1.6.0"}),(0,r.jsx)(n.td,{children:"\u2705"}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"JuiceFS"}),(0,r.jsx)(n.td,{children:"v1.1.2"}),(0,r.jsx)(n.td,{children:"\u2705"}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"NFS"}),(0,r.jsx)(n.td,{children:"v5.5.0"}),(0,r.jsx)(n.td,{children:"\u274c"}),(0,r.jsx)(n.td,{children:"Bootstrap with NFS protocol >= 4.2, but can not recycle tenant resource."})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"supported-oceanbase-versions",children:"Supported OceanBase Versions"}),"\n",(0,r.jsx)(n.p,{children:"ob-operator supports OceanBase v4.x versions. Some features may require a specific OceanBase version. Please consult the documentation for details."}),"\n",(0,r.jsx)(n.p,{children:"OceanBase v3.x versions are currently not supported by ob-operator."}),"\n",(0,r.jsx)(n.h2,{id:"development-requirements",children:"Development requirements"}),"\n",(0,r.jsxs)(n.p,{children:["ob-operator is built using the ",(0,r.jsx)(n.a,{href:"https://book.kubebuilder.io/introduction",children:"kubebuilder"})," project, so the development and runtime environment are similar to it."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"To build ob-operator: Go version 1.22 or higher is required."}),"\n",(0,r.jsx)(n.li,{children:"To run ob-operator: Kubernetes cluster and kubectl version 1.18 or higher are required. We examined the functionalities on k8s cluster of version from 1.23 ~ 1.28 and ob-operator performs well."}),"\n",(0,r.jsx)(n.li,{children:"If using Docker as the container runtime for the cluster, Docker version 17.03 or higher is required. We tested building and running ob-operator with Docker 18."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"documents",children:"Documents"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/docs/developer/arch",children:"Architecture"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/docs/developer/contributor-guidance",children:"Contributor Guidance"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/docs/manual/what-is-ob-operator",children:"User Manual"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"getting-help",children:"Getting Help"}),"\n",(0,r.jsx)(n.p,{children:"If you encounter any issues while using ob-operator, please feel free to seek help through the following channels:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/oceanbase/ob-operator/issues",children:"GitHub Issue"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://ask.oceanbase.com/",children:"Official Forum"})," (in Chinese)"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://oceanbase.slack.com/archives/C053PT371S7",children:"Slack"})}),"\n",(0,r.jsx)(n.li,{children:"WeChat Group (Add the assistant with WeChat ID: OBCE666)"}),"\n",(0,r.jsxs)(n.li,{children:["DingTalk Group (",(0,r.jsx)(n.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:s(8609).A+"",children:"QRCode"}),")"]}),"\n"]}),"\n",(0,r.jsx)("div",{style:{width:"200px"},children:(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"DingTalk Group QRCode",src:s(4099).A+"",width:"464",height:"464"})})}),"\n",(0,r.jsx)(n.h2,{id:"contributing",children:"Contributing"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/oceanbase/ob-operator/issues",children:"Submit an issue"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/oceanbase/ob-operator/discussions",children:"Create a discussion"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/oceanbase/ob-operator/pulls",children:"Create a pull request"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,r.jsxs)(n.p,{children:["ob-operator is licensed under the ",(0,r.jsx)(n.a,{href:"http://license.coscl.org.cn/MulanPSL2",children:"MulanPSL - 2.0"})," License.\nYou are free to copy and use the source code. When you modify or distribute the source code, please comply with the MulanPSL - 2.0 Agreement."]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8609:(e,n,s)=>{s.d(n,{A:()=>r});const r=s.p+"assets/files/dingtalk-operator-users-28b6fd8d3ebcb81815cc06a78dab7a22.png"},4099:(e,n,s)=>{s.d(n,{A:()=>r});const r=s.p+"assets/images/dingtalk-operator-users-28b6fd8d3ebcb81815cc06a78dab7a22.png"},2818:(e,n,s)=>{s.d(n,{A:()=>r});const r=s.p+"assets/images/ob-operator-arch-4303fd6bdbb5a88f3cf0ea640f9e8265.png"},6186:(e,n,s)=>{s.d(n,{A:()=>r});const r=s.p+"assets/images/ob-operator-task-manager-arch-af746e5c9ef3dc1c9ce493fc38b54820.png"},155:(e,n,s)=>{s.d(n,{A:()=>r});const r=s.p+"assets/images/oceanbase-dashboard-install-7f313d8e81f1dcff41955d06990e8940.jpg"},9133:(e,n,s)=>{s.d(n,{A:()=>r});const r=s.p+"assets/images/oceanbase-dashboard-overview-875155f60af5b502489f45ab8961f181.jpg"},1695:(e,n,s)=>{s.d(n,{A:()=>r});const r=s.p+"assets/images/oceanbase-dashboard-service-c10652b2c946be814ab204ef049efad0.jpg"},3631:(e,n,s)=>{s.d(n,{A:()=>r});const r=s.p+"assets/images/oceanbase-dashboard-topology-56a76c9d21598ba71401f6e33c1e8122.jpg"},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>i});var r=s(6540);const t={},o=r.createContext(t);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);