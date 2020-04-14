import React from "react";
// import ZqPageLoading from "@/components/loading/ZqPageLoading";
// import { Lone } from '@/components/loading/ZqPageLoading/type.js'

// function isApiPord(){
//   let host = window.location.host;

//   if (host.indexOf('izhiqun.com') > -1 || host.indexOf('study.zuimeia.com') > -1 || host.indexOf('nicelivepre.zuimeia.com') > -1){
//     return true;
//   } else {
//     return false;
//   }
// }


export default {
	// HTML的title模板
	htmlTitle: "知群 - {title}",
	// 路由加载效果
	router: {
    // loading: <Lone loading type={1} />
		// loading: (
    //   <ZqPageLoading
    //     loading
    //     type={2}
    //     maskStyle={{ backgroundColor: 'transparent' }}
    //     styleZqModal={{ top: '0.2rem' }}
    //     />
    // )
	},
  //是否生产环境
	isPord: (process.env.NODE_ENV === 'production'),
  //请求接口 是否正式环境
	// isApiPord: isApiPord(),
  // 路由是使用hashHistory形式
  // isHashHistory: (window.location.href).indexOf('#/') > -1,
  isHashHistory: false,
  // 是否使用强制新登录、绑定手机号功能
  isUseModalLogin: true,





};
