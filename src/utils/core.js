import React from "react";
import dynamic from "dva/dynamic";
import { Route, Switch, Redirect } from "dva/router";
import DocumentTitle from "react-document-title";
import config from "@/config.js";

/**
 * 生成动态组件
 * @param {*} app
 * @param {*} models
 * @param {*} component
 */
export const dynamicWrapper = (app, models, component) =>
	dynamic({
		app,
		models: () => models,
		component
	});

/**
 * 生成一组路由
 * @param {*} app
 * @param {*} routesConfig
 */
export const createRoutes = (app, routesConfig) => {
	return (
		<Switch>
			{routesConfig(app).map(item => createRoute(app, () => item))}
		</Switch>
	);
};
// 路由映射表
window.dva_router_pathMap = {};

/**
 * 生成单个路由
 * @param {*} app
 * @param {*} routesConfig
 */
export const createRoute = (app, routesConfig) => {

	let {
		component: Comp,
		path,
		exact,
		indexRoute,
		title="学习和内推在知群",
		...otherProps
	} = routesConfig(app);

	if (path && path !== "/") {
		window.dva_router_pathMap[path] = { path, title, ...otherProps };
	}

	let baseTitle = config.htmlTitle;

	// if (path.indexOf('/m/sc/') > -1){
	// 	baseTitle = "知群说 - {title}";
	// }

	let routeProps = Object.assign(
		{
			key: path || Math.random(4),
			render: props => (
				<DocumentTitle
					title={title ? baseTitle.replace(/{.*}/gi, title) : baseTitle.slice(0, -10)}
					>
					<Comp routerData={otherProps} {...props} />
				</DocumentTitle>
			)
		},
		path && {
			path: path
		},
		exact && {
			exact: exact
		},
	);

	if (indexRoute) {
		return [
			<Redirect key={path + "_redirect"} exact from={path} to={indexRoute} />,
			<Route {...routeProps} />
		];
	}

	return <Route {...routeProps} />;
};
