import http from '../util/http.js'

const url = {
	// 查询化验月报数据
	queryAssay: "/monthly/queryAssay",

	// 工艺 每日数据
	queryCraft: "/daily/queryCraft",
}

export default {
	url: url,
	// 查询化验月报数据
	queryAssay(params) {
		return http.post(url.queryAssay, params)
	},
	// 工艺 每日数据
	queryCraft(params) {
		return http.post(url.queryCraft, params)
	},
}