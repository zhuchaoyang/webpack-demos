// import 'utils/rem.js';
import "@/assets/styles/index.scss";

import dva from "dva";
import dynamic from "dva/dynamic";
import createLoading from "dva-loading";
// import { Router } from "dva/router";

// import * as history from 'history';
// import createBrowserHistory from 'history/createBrowserHistory';
// import { createBrowserHistory } from 'history';
import { createHashHistory } from 'history';

// import { message } from "antd";



// console.log('App 初始化！', plat());

// 1. Initialize
const app = dva({
	history: createHashHistory(),
	// history: createBrowserHistory({
	// 	basename: '/m',	// 基链接
	// 	forceRefresh: isMobileWx,	//是否强制刷新整个页面
	// // 	keyLength: 6,	//location.key的长度
	// // 	getUserConfirmation: (message,callback) => callback(window.confirm(message)) 	// 跳转拦截函数
	// }),
	onError(e) {
		// message.error(e.message);
	},
});
// 2. Plugins
app.use(createLoading());

// -> loading
// dynamic.setDefaultLoadingComponent(() => config.router.loading);

// 3. Model
app.model(require("./models/user").default);

// 4. Router
app.router(require("./routes/index.js").default);

// 5. Start
app.start("#root");


// export global
export default {
	app,
	store: app._store,
	dispatch: app._store.dispatch
};
