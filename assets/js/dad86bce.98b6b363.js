"use strict";(self.webpackChunkdocsite=self.webpackChunkdocsite||[]).push([[1222],{909:(e,o,r)=>{r.r(o),r.d(o,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>t,metadata:()=>i,toc:()=>l});var a=r(4848),n=r(8453);const t={sidebar_position:1},s="Manage clusters",i={id:"manual/ob-operator-user-guide/cluster-management-of-ob-operator/cluster-management-intro",title:"Manage clusters",description:"ob-operator defines the following custom resource definitions (CRDs) based on the deployment mode of OceanBase clusters:",source:"@site/docs/manual/500.ob-operator-user-guide/100.cluster-management-of-ob-operator/100.cluster-management-intro.md",sourceDirName:"manual/500.ob-operator-user-guide/100.cluster-management-of-ob-operator",slug:"/manual/ob-operator-user-guide/cluster-management-of-ob-operator/cluster-management-intro",permalink:"/ob-operator/docs/manual/ob-operator-user-guide/cluster-management-of-ob-operator/cluster-management-intro",draft:!1,unlisted:!1,editUrl:"https://github.com/oceanbase/ob-operator/tree/master/docsite/docs/manual/500.ob-operator-user-guide/100.cluster-management-of-ob-operator/100.cluster-management-intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"manualSidebar",previous:{title:"Cluster management",permalink:"/ob-operator/docs/category/cluster-management"},next:{title:"Create a cluster",permalink:"/ob-operator/docs/manual/ob-operator-user-guide/cluster-management-of-ob-operator/create-cluster"}},c={},l=[];function d(e){const o={a:"a",code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.h1,{id:"manage-clusters",children:"Manage clusters"}),"\n",(0,a.jsx)(o.p,{children:"ob-operator defines the following custom resource definitions (CRDs) based on the deployment mode of OceanBase clusters:"}),"\n",(0,a.jsxs)(o.ul,{children:["\n",(0,a.jsxs)(o.li,{children:[(0,a.jsx)(o.code,{children:"obclusters.oceanbase.oceanbase.com"})," defines OceanBase clusters. You can define OceanBase clusters and perform cluster O&M tasks by modifying this resource definition."]}),"\n",(0,a.jsxs)(o.li,{children:[(0,a.jsx)(o.code,{children:"obzones.oceanbase.oceanbase.com"})," defines a specific zone and is used for O&M of the zone. Generally, you do not need to modify this resource definition. ob-operator automatically maintains this resource definition."]}),"\n",(0,a.jsxs)(o.li,{children:[(0,a.jsx)(o.code,{children:"observers.oceanbase.oceanbase.com"})," defines a specific OBServer node and is used for O&M of the OBServer node. Generally, you do not need to modify this resource definition. ob-operator automatically maintains this resource definition."]}),"\n",(0,a.jsxs)(o.li,{children:[(0,a.jsx)(o.code,{children:"obparameters.oceanbase.oceanbase.com"})," defines parameters of OceanBase Database and is used for O&M of parameters. Generally, you do not need to modify this resource definition. ob-operator automatically maintains this resource definition."]}),"\n"]}),"\n",(0,a.jsxs)(o.p,{children:["You can implement the O&M of OceanBase clusters by creating or modifying ",(0,a.jsx)(o.code,{children:"obparameters.oceanbase.oceanbase.com"}),". For example, you can perform the following O&M tasks:"]}),"\n",(0,a.jsxs)(o.ul,{children:["\n",(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:"/ob-operator/docs/manual/ob-operator-user-guide/cluster-management-of-ob-operator/create-cluster",children:"Create a cluster"})}),"\n",(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:"/ob-operator/docs/manual/ob-operator-user-guide/cluster-management-of-ob-operator/zone-management/add-zone",children:"Add zones to a cluster"})}),"\n",(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:"/ob-operator/docs/manual/ob-operator-user-guide/cluster-management-of-ob-operator/zone-management/delete-zone",children:"Delete zones from a cluster"})}),"\n",(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:"/ob-operator/docs/manual/ob-operator-user-guide/cluster-management-of-ob-operator/server-management/add-server",children:"Add OBServer nodes to zones"})}),"\n",(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:"/ob-operator/docs/manual/ob-operator-user-guide/cluster-management-of-ob-operator/server-management/delete-server",children:"Delete OBServer nodes from zones"})}),"\n",(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:"/ob-operator/docs/manual/ob-operator-user-guide/cluster-management-of-ob-operator/upgrade-cluster-of-ob-operator",children:"Upgrade a cluster"})}),"\n",(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:"/ob-operator/docs/manual/ob-operator-user-guide/cluster-management-of-ob-operator/parameter-management",children:"Manage parameters"})}),"\n",(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:"/ob-operator/docs/manual/ob-operator-user-guide/cluster-management-of-ob-operator/delete-cluster",children:"Delete a cluster"})}),"\n"]})]})}function u(e={}){const{wrapper:o}={...(0,n.R)(),...e.components};return o?(0,a.jsx)(o,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,o,r)=>{r.d(o,{R:()=>s,x:()=>i});var a=r(6540);const n={},t=a.createContext(n);function s(e){const o=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function i(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),a.createElement(t.Provider,{value:o},e.children)}}}]);