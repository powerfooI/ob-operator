"use strict";(self.webpackChunkdocsite=self.webpackChunkdocsite||[]).push([[440],{2211:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>i});var s=a(4848),t=a(8453);const o={sidebar_position:1,title:"A Real-World Example"},r="Deploy OceanBase Database and web app in a Kubernetes cluster",c={id:"manual/appendix/example",title:"A Real-World Example",description:"This topic describes how to deploy OceanBase Database, related components, and applications in a Kubernetes cluster by using a real-world example.",source:"@site/docs/manual/900.appendix/100.example.md",sourceDirName:"manual/900.appendix",slug:"/manual/appendix/example",permalink:"/ob-operator/docs/manual/appendix/example",draft:!1,unlisted:!1,editUrl:"https://github.com/oceanbase/ob-operator/tree/master/docsite/docs/manual/900.appendix/100.example.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"A Real-World Example"},sidebar:"manualSidebar",previous:{title:"Appendix",permalink:"/ob-operator/docs/category/appendix"},next:{title:"FAQ",permalink:"/ob-operator/docs/manual/appendix/FAQ"}},l={},i=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Deploy OceanBase Database and related components",id:"deploy-oceanbase-database-and-related-components",level:2},{value:"Preparations before deployment",id:"preparations-before-deployment",level:3},{value:"Deploy ob-configserver",id:"deploy-ob-configserver",level:3},{value:"Deploy an OceanBase cluster",id:"deploy-an-oceanbase-cluster",level:3},{value:"Deploy ODP",id:"deploy-odp",level:3},{value:"Deploy applications",id:"deploy-applications",level:2},{value:"Create a tenant",id:"create-a-tenant",level:3},{value:"Deploy an application",id:"deploy-an-application",level:3},{value:"Deploy the monitoring system",id:"deploy-the-monitoring-system",level:2},{value:"Deploy Prometheus",id:"deploy-prometheus",level:3},{value:"Deploy Grafana",id:"deploy-grafana",level:3},{value:"Summary",id:"summary",level:2},{value:"Note",id:"note",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"deploy-oceanbase-database-and-web-app-in-a-kubernetes-cluster",children:"Deploy OceanBase Database and web app in a Kubernetes cluster"}),"\n",(0,s.jsx)(n.p,{children:"This topic describes how to deploy OceanBase Database, related components, and applications in a Kubernetes cluster by using a real-world example."}),"\n",(0,s.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,s.jsxs)(n.p,{children:["Before you start the deployment, make sure that you have deployed ",(0,s.jsx)(n.a,{href:"https://cert-manager.io/docs/",children:"cert-manager"}),", ",(0,s.jsx)(n.a,{href:"https://github.com/rancher/local-path-provisioner",children:"local-path-provisioner"}),", and ",(0,s.jsx)(n.a,{href:"https://github.com/oceanbase/ob-operator",children:"ob-operator"})," in your Kubernetes cluster."]}),"\n",(0,s.jsx)(n.p,{children:"In this example, the following components are deployed:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/oceanbase/oceanbase",children:"OceanBase Database"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/oceanbase/oceanbase/tree/master/tools/ob-configserver",children:"ob-configserver"}),", which is used to register the IP address of the RootService server for OceanBase Database."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/oceanbase/obproxy",children:"OceanBase Database Proxy (ODP)"}),", the proxy of OceanBase Database."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/oceanbase/ob-operator/tree/master/distribution/oceanbase-todo",children:"OceanBase Todo List"}),". An extremely simple web application taken as an example to describe how to deploy web applications and use OceanBase cluster as backend database in the Kubernetes cluster."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://prometheus.io/",children:"Prometheus"}),", the monitoring and alerting system that collects and calculates the monitoring metrics of OceanBase Database."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://grafana.com/",children:"Grafana"}),", the data visualization system. You can connect Grafana to Prometheus to display the monitoring data of OceanBase Database."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"deploy-oceanbase-database-and-related-components",children:"Deploy OceanBase Database and related components"}),"\n",(0,s.jsx)(n.h3,{id:"preparations-before-deployment",children:"Preparations before deployment"}),"\n",(0,s.jsx)(n.p,{children:"Create a namespace:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.2.2_release/example/webapp/namespace.yaml\n"})}),"\n",(0,s.jsx)(n.p,{children:"View the created namespace:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl get namespace oceanbase\n"})}),"\n",(0,s.jsx)(n.p,{children:"The following output indicates that the namespace is created:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"NAME        STATUS   AGE\noceanbase   Active   98s\n"})}),"\n",(0,s.jsx)(n.p,{children:"Create secrets for the cluster and tenants:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.2.2_release/example/webapp/secret.yaml\n"})}),"\n",(0,s.jsx)(n.p,{children:"View the created secrets:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl get secret -n oceanbase\n"})}),"\n",(0,s.jsx)(n.p,{children:"The following output indicates that the secrets are created:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"NAME                      TYPE                                  DATA   AGE\nsc-metatenant-root        Opaque                                1      11s\nsc-metatenant-standbyro   Opaque                                1      11s\nsc-sys-monitor            Opaque                                1      11s\nsc-sys-operator           Opaque                                1      11s\nsc-sys-proxyro            Opaque                                1      11s\nsc-sys-root               Opaque                                1      11s\n"})}),"\n",(0,s.jsx)(n.h3,{id:"deploy-ob-configserver",children:"Deploy ob-configserver"}),"\n",(0,s.jsxs)(n.p,{children:["ob-configserver allows you to register, store, and query metadata of the RootService server for OceanBase Database. The supported metadata storage types are ",(0,s.jsx)(n.code,{children:"sqlite3"})," and ",(0,s.jsx)(n.code,{children:"mysql"}),". In this example, ",(0,s.jsx)(n.code,{children:"sqlite3"})," is used.\nRun the following command to deploy ob-configserver and create the corresponding service:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.2.2_release/example/webapp/configserver.yaml\n"})}),"\n",(0,s.jsx)(n.p,{children:"Check the pod status:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl get pods -n oceanbase | grep ob-configserver\n\n# desired output\nob-configserver-856bf5d865-dlwxr   1/1     Running   0          16s\n"})}),"\n",(0,s.jsx)(n.p,{children:"Check the svc status:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl get svc svc-ob-configserver -n oceanbase\n\n# desired output\nNAME                  TYPE       CLUSTER-IP   EXTERNAL-IP   PORT(S)          AGE\nsvc-ob-configserver   NodePort   10.96.3.39   <none>        8080:30080/TCP   98s\n"})}),"\n",(0,s.jsx)(n.h3,{id:"deploy-an-oceanbase-cluster",children:"Deploy an OceanBase cluster"}),"\n",(0,s.jsxs)(n.p,{children:["When you deploy an OceanBase cluster, add environment variables and set the system parameter ",(0,s.jsx)(n.code,{children:"obconfig_url"})," to the IP address of ob-configserver service. OceanBase Database will register the information of RootService with ob-configserver.\nDeploy the OceanBase cluster:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.2.2_release/example/webapp/obcluster.yaml\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Run the following command to query the status of the OceanBase cluster until the status becomes ",(0,s.jsx)(n.code,{children:"running"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl get obclusters.oceanbase.oceanbase.com metadb -n oceanbase\n\n# desired output\nNAME     STATUS    AGE\nmetadb   running   3m21s\n"})}),"\n",(0,s.jsx)(n.h3,{id:"deploy-odp",children:"Deploy ODP"}),"\n",(0,s.jsx)(n.p,{children:"You can start ODP by using ob-configserver or specifying the RS list. To maximize the performance of ODP, we recommend that you connect ODP to the cluster by using ob-configserver."}),"\n",(0,s.jsx)(n.p,{children:"Run the following command to deploy ODP and create the ODP service:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.2.2_release/example/webapp/obproxy.yaml\n"})}),"\n",(0,s.jsx)(n.p,{children:"When you query the pod status of ODP, you can see two ODP pods."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl get pod -A | grep obproxy\n\n# desired output\noceanbase            obproxy-5cb8f4d975-pmr59                          1/1     Running   0          21s\noceanbase            obproxy-5cb8f4d975-xlvjp                          1/1     Running   0          21s\n"})}),"\n",(0,s.jsx)(n.p,{children:"View information about the ODP service:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl get svc svc-obproxy -n oceanbase\n\n# desired output\nNAME          TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)             AGE\nsvc-obproxy   ClusterIP   10.96.2.46   <none>        2883/TCP,2884/TCP   2m26s\n"})}),"\n",(0,s.jsx)(n.p,{children:"Connect to the OceanBase cluster by using the IP address of the ODP service:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"mysql -h${obproxy-service-address} -P2883 -uroot@sys#metadb -p\n"})}),"\n",(0,s.jsx)(n.p,{children:"If the OceanBase cluster is connected, the ODP service is normal."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://obbusiness-private.oss-cn-shanghai.aliyuncs.com/doc/img/observer/V4.2.0/ob-operator-1.png",alt:"connection"})}),"\n",(0,s.jsxs)(n.p,{children:["If the ",(0,s.jsx)(n.code,{children:"cluster not exist"})," message is returned, it indicates that the OceanBase cluster has not registered the cluster metadata with ob-configserver. Try again later. You can view the registration result by using the ",(0,s.jsx)(n.code,{children:'curl "http://127.0.0.1:30080/services?Action=ObRootServiceInfo&ObCluster=metadb"'})," statement. If the RsList parameter is not empty in the response, the cluster metadata is registered."]}),"\n",(0,s.jsx)(n.h2,{id:"deploy-applications",children:"Deploy applications"}),"\n",(0,s.jsx)(n.h3,{id:"create-a-tenant",children:"Create a tenant"}),"\n",(0,s.jsx)(n.p,{children:"You can create a dedicated tenant for each type of business for better resource isolation. In this example, one tenant is created."}),"\n",(0,s.jsx)(n.p,{children:"Run the following command to create a tenant:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.2.2_release/example/webapp/tenant.yaml\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Run the following command to query the status of the tenant until the status becomes ",(0,s.jsx)(n.code,{children:"running"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl get obtenants.oceanbase.oceanbase.com metatenant -n oceanbase\nNAME         STATUS    TENANTNAME   TENANTROLE   CLUSTERNAME   AGE\nmetatenant   running   metatenant   PRIMARY      metadb        106s\n"})}),"\n",(0,s.jsx)(n.p,{children:"Run the following command to verify that the tenant can be connected:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"mysql -h${obproxy-service-address} -P2883 -uroot@metatenant#metadb -p\n"})}),"\n",(0,s.jsx)(n.p,{children:"If the tenant is connected, you can use it."}),"\n",(0,s.jsx)(n.h3,{id:"deploy-an-application",children:"Deploy an application"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/oceanbase/ob-operator/tree/master/distribution/oceanbase-todo",children:"OceanBase Todo List"})," is an extremely simple web application taken as an example to describe how to deploy web applications and use OceanBase cluster as backend database in the Kubernetes cluster."]}),"\n",(0,s.jsx)(n.p,{children:"Run the following command to create databases first:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"# Connect to the tenant\nmysql -h${obproxy-service-address} -P2883 -uroot@metatenant#metadb -p\n\n# Create dev database\ncreate database dev;\n"})}),"\n",(0,s.jsx)(n.p,{children:"Run the following command to deploy the application:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.2.2_release/example/webapp/oceanbase-todo.yaml\n"})}),"\n",(0,s.jsx)(n.p,{children:"After the deployment process is completed, run the following command to view the application status:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"# Check the pod\nkubectl get pods -n oceanbase | grep oceanbase-todo\noceanbase-todo-746c7ff78f-49dxv       1/1     Running   0             12m\noceanbase-todo-746c7ff78f-4875t       1/1     Running   0             12m\n\n# Check service\nkubectl get svc svc-oceanbase-todo -n oceanbase\nNAME                  TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)           AGE\nsvc-oceanbase-todo    NodePort   10.43.39.231   <none>        20031:32080/TCP   12m\n"})}),"\n",(0,s.jsx)(n.p,{children:"An application provides service a while after it is deployed. You can access the application by using the service address."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:'# Check service with the following command:\ncurl \'http://${service_ip}:${service_port}\'\n\n# Take Cluster IP 10.43.39.231 as an example\ncurl http://10.43.39.231:20031\n# Desired output is as follows:\n<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/png" href="/logo.png" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>OceanBase Todo List</title>\n    <script type="module" crossorigin src="/assets/index-DHbyEFSo.js"><\/script>\n    <link rel="stylesheet" crossorigin href="/assets/index-B8po_uIp.css">\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>\n'})}),"\n",(0,s.jsxs)(n.p,{children:["If you want to access the application from the Internet, you can use service of type NodePort to expose the application at a port on the K8s node. The NodePort is ",(0,s.jsx)(n.code,{children:"32080"})," in this example. You can access the application on address: ",(0,s.jsx)(n.code,{children:"http://${node_ip}:32080"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"deploy-the-monitoring-system",children:"Deploy the monitoring system"}),"\n",(0,s.jsx)(n.h3,{id:"deploy-prometheus",children:"Deploy Prometheus"}),"\n",(0,s.jsx)(n.p,{children:"When you deploy the OceanBase cluster, an OBAgent sidecar container is created in each pod to provide monitoring data over the Prometheus protocol. A service is also created to automatically identify the IP address of OBAgent to collect data with the service discovery feature enabled."}),"\n",(0,s.jsx)(n.p,{children:"Run the following command to deploy Prometheus:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.2.2_release/example/webapp/prometheus.yaml\n"})}),"\n",(0,s.jsx)(n.p,{children:"Run the following command to view the deployment status:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"# check pod status\nkubectl get pods -n oceanbase | grep prometheus\nprometheus-576d7757b9-jsvfh        1/1     Running   0          3m17s\n\n# check service status\nkubectl get svc svc-prometheus -n oceanbase\nNAME             TYPE       CLUSTER-IP    EXTERNAL-IP   PORT(S)          AGE\nsvc-prometheus   NodePort   10.96.1.212   <none>        9090:30090/TCP   3m45s\n"})}),"\n",(0,s.jsx)(n.h3,{id:"deploy-grafana",children:"Deploy Grafana"}),"\n",(0,s.jsx)(n.p,{children:"Grafana displays the metrics of OceanBase Database by using Prometheus as a data source.\nRun the following command to deploy Grafana:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"kubectl apply -f https://raw.githubusercontent.com/oceanbase/ob-operator/2.2.2_release/example/webapp/grafana.yaml\n"})}),"\n",(0,s.jsx)(n.p,{children:"Run the following command to view the deployment status:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"# check pod status\nkubectl get pods -n oceanbase | grep grafana\ngrafana-b7c6c6ccb-dkv57            1/1     Running   0          2m\n\n# check service status\nkubectl get svc svc-grafana -n oceanbase\nNAME          TYPE       CLUSTER-IP    EXTERNAL-IP   PORT(S)          AGE\nsvc-grafana   NodePort   10.96.2.145   <none>        3000:30030/TCP   2m\n"})}),"\n",(0,s.jsx)(n.p,{children:"Open a browser and visit the service address to view the monitoring metrics of OceanBase Database."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://obbusiness-private.oss-cn-shanghai.aliyuncs.com/doc/img/observer/V4.2.0/ob-operator-2.png",alt:"Grafana"})}),"\n",(0,s.jsx)(n.h2,{id:"summary",children:"Summary"}),"\n",(0,s.jsx)(n.p,{children:"This topic describes how to deploy OceanBase Database and related components such as ODP and ob-configserver, applications, and the monitoring system. You can deploy other applications based on the example."}),"\n",(0,s.jsx)(n.h2,{id:"note",children:"Note"}),"\n",(0,s.jsxs)(n.p,{children:["You can find all configuration files used in this topic in the ",(0,s.jsx)(n.a,{href:"https://github.com/oceanbase/ob-operator/tree/2.2.2_release/example/webapp",children:"webapp"})," directory."]})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>r,x:()=>c});var s=a(6540);const t={},o=s.createContext(t);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);