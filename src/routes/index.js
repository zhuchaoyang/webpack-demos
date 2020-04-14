import React from "react";
import { Router } from "dva/router";
import { ConfigProvider } from "antd";
// import zh_CN from "antd/lib/locale-provider/zh_CN";
import zhCN from 'antd/es/locale/zh_CN';
import { createRoutes } from "@/utils/core";
import { dynamicWrapper } from "@/utils/core";


import App from "@/layouts/App";



const routesData = app => {
  let result = [
    // tabbar-首页  /home
    {
      path: "/",
      title: "首页",
      exact: true,
      indexRoute: "/home",
      component: dynamicWrapper(
        app, 
        [import("@/pages/home/models")], 
        () => import("@/pages/home")
      )
    },
    {
      path: "/home",
      title: "首页",
      component: dynamicWrapper(
        app, 
        [import("@/pages/home/models")], 
        () => import("@/pages/home")
      )
    },
  ]

  return result;
}


function RouterConfig({ history, app }) {
  return (
    <ConfigProvider autoInsertSpaceInButton={false} locale={zhCN}>
      <App>
        <Router history={history}>{createRoutes(app, routesData)}</Router>
      </App>
    </ConfigProvider>
  );
}
// ssh-keygen -t rsa -f ~/.ssh/id_rsa.codeAli -C "455085979@qq.com"

export default RouterConfig;
