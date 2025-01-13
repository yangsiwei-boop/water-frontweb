// const BASE_URL = 'http://47.106.144.138:8081/'
const BASE_URL = 'http://47.106.231.125:18082/'
const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync('tokenValue'); //这里取token之前，你肯定需要先拿到token,存一下
		const tokenName = uni.getStorageSync('tokenName'); //这里取token之前，你肯定需要先拿到token,存一下
		let headers = {
			'Content-Type': 'application/json;'
		}
		headers['Content-Type'] = options.dataType == 'formData' ? 'multipart/form-data' : 'application/json;'
		if (token) {
			// config.params = {'token':token} //如果要求携带在参数中
			headers[tokenName] = token; //如果要求携带在请求头中
		}
		if (options.dataType !== 'formData') {
		    options.formData = JSON.stringify(options.data); //数据转化,也可以使用qs转换
		  }
		console.log(options, 'options')
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: headers,
			success: (res) => {
				console.log(res, headers)
				if (res.data.code == '401') {
					uni.showToast({
						title: res.data.msg,
						icon: 'error'
					});
					uni.clearStorage({
					    success: function () {
					        console.log('清除成功');
					    },
					    fail: function () {
					        console.log('清除失败');
					    }
					});
					uni.reLaunch({
						url: "/pages/login/index",
					});
				} else {
					resolve(res)
				}
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败',
					icon: 'error'
				})
				reject(err)
			}
		})
	})
}
export default myRequest