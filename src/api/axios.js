import axios from 'axios'
const baseUrl = '/api'

//axios二次封装的核心
class HttpRequest {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl
    }

    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {}
        }
        return config
    }

    interceptors(instance) {
        instance.interceptors.request.use(config => {
            return config
        }, error => {
            return Promise.reject(error)
        })

        instance.interceptors.response.use(res => {
            return res.data
        }, error => {
            return Promise.reject(error)
        })
    }

    request(options){
        options = {...this.getInsideConfig(), ...options}
        //创建axios实例
        const instance = axios.create()
        //实例绑定拦截器
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)