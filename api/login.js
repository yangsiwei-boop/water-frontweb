import http from '../util/http.js'

const url = {
	// 校验是否登录
	isLogin: "/login/isLogin",
	// 登录
	login: "/login/login",
	// 退出
	logOut: "/login/logout"
}

export default {
	url: url,
	// 校验是否登录
	isLogin(params) {
		return http.post(url.login, params)
	},
	// 登录
	login(params) {
		return http.post(url.login, params)
	},
	// 退出
	logOut(params) {
		return http.post(url.logOut, params)
	}
}