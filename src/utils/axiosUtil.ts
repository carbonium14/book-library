import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import conf from '../config'
import { ElMessage } from 'element-plus'
import storage from './goodstorageUtil'
import router from '../router/index'
const SERVER_ERR = '请求服务器网址错误或网络连接失败'
type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
const methods:Method[] = ['get', 'post', 'put', 'delete', 'patch']
type ReqFn = (url: string, isMock: boolean, data?: any) => AxiosPromise<any>
interface AxiosRequestConfig_ extends AxiosRequestConfig {
  isMock: boolean
}
interface ReqExecute {
  'get': ReqFn,
  'post': ReqFn,
  'put': ReqFn,
  'delete': ReqFn,
  'patch': ReqFn,
}
class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil()
  axiosInstance!: AxiosInstance
  request!: ReqExecute
  constructor() {
    this.request = {
      'get': ():any => {},
      'post': ():any => {},
      'put': ():any => {},
      'delete': ():any => {},
      'patch': ():any => {},
    }
    this.createAxiosInstance()
    this.beforeReqIntercpt()
    this.beforeResponseIntercpt()
    this.reqPrepare()
  }
  createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 15000 })
  }
  beforeReqIntercpt() {
    this.axiosInstance.interceptors.request.use((request) => {
      const token = storage.get('token')
      const header = request.headers
      if (!header.Authorization && token) {
        header.Authorization = `Bearer ${token}`
      }
      return request
    })
  }
  beforeResponseIntercpt() {
    this.axiosInstance.interceptors.response.use((response) => {
      const { data, msg, code } = response.data
      if (code === 200) {
        return response.data
      } else if (code === 500) {
        ElMessage.error(`发生了错误, ${msg}`)
        return 
      } else if (code === 401) {
        if (msg === '这是不合法的或者过期的token') {
          storage.remove('token')
          router.push({
            path: '/login'
          })
          ElMessage.error(`发生了错误, ${msg}`)
          throw new Error(`发生了错误, ${msg}`)
        }
      } else {
        ElMessage.error('发生了未知错误')
        return
      }
    }, (err) => {
      ElMessage.error(`${SERVER_ERR}:${err}`)
    })
  }
  sendRequest(options: AxiosRequestConfig_) {
    if (conf.env === 'production') {
      this.axiosInstance.defaults.baseURL = conf.baseApi
    } else if (conf.env === 'development') {
      const isMock: boolean = options.isMock || conf.isMock
      this.axiosInstance.defaults.baseURL = isMock ? conf.mockBaseApi : conf.baseApi
    }
    return this.axiosInstance(options)
  }
  reqPrepare() {
    methods.forEach((method) => {
      this.request[method] = (url, isMock, data) => {
        return this.sendRequest({
          url,
          method,
          isMock,
          data
        })
      }
    })
  }
}
export default AxiosUtil.axiosUtil.request