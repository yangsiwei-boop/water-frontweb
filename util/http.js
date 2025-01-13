/****   http.js   ****/
import myRequest from './request'

const http = {
    /**
     * methods: 请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    get(url, params) {
        const config = {
            method: 'get',
            url: url
        }
        if (params) config.params = params
        return myRequest(config)
    },
    post(url, params, dataType) {
        const config = {
            method: 'post',
            url: url,
            dataType: dataType
        }
        if (params) config.data = params
        return myRequest(config)
    },
    put(url, params) {
        const config = {
            method: 'put',
            url: url
        }
        if (params) config.params = params
        return myRequest(config)
    },
    delete(url, params) {
        const config = {
            method: 'delete',
            url: url
        }
        if (params) config.params = params
        return myRequest(config)
    },
    export(url, params, requestMethod = 'get') {
        const config = {
            method: requestMethod,
            responseType: 'blob',
            url: url
        }
        if (params) config.data = params
        return myRequest(config)
    }
}
//导出
export default http