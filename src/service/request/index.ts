import axios from "axios"
import { ElLoading } from "element-plus"

import type { AxiosInstance } from "axios"
import type { WestRequestInterceptors, WestRequestConfig } from "./types"
import type { ILoadingInstance } from "element-plus"

// axios -> axios instance(实例)

const DEFAULT_LOADING = true

class WestRequest {
  instance: AxiosInstance
  interceptors?: WestRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: WestRequestConfig) {
    // 创建axios的实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 从config中取出的拦截器是对应实例的拦截器
    // 创建请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 从config中取出的拦截器是对应实例的拦截器
    // 创建响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器 (请求拦截器：先进后出; 响应拦截器：先进先出)
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("所有的实例都有的拦截器：请求拦截成功1")

        // 发送请求显示Loading动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据....",
            background: "rgba(0, 0, 0, 0.5)"
          })
        }

        return config
      },
      (error) => {
        // console.log("所有的实例都有的拦截器：请求失败1")
        return error
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        // console.log("所有的实例都有的拦截器, 响应拦截成功2")

        // 将Loading移除
        this.loading?.close()

        const data = response.data
        if (data.returnCode === "-1001") {
          console.log("请求失败~，错误信息")
        }

        return data
      },
      (error) => {
        // console.log("所有的实例都有的拦截器：响应失败2")
        // 将Loading移除
        this.loading?.close()

        // 例子：判断不同的httpErrorCode显示不同的错误信息
        if (error.response.status === 404) {
          console.log("404的错误~")
        }

        return error
      }
    )
  }

  request<T>(config: WestRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 属于某一个请求单独的请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 让编码人员自已决定当前请求是否需要显示Loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((response) => {
          // 属于某一个请求单独的响应拦截器
          if (config.interceptors?.responseInterceptor) {
            response = config.interceptors.responseInterceptor(response)
          }

          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果通过resolve返回出去
          resolve(response)
        })
        .catch((error) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          reject(error)
        })
    })
  }

  get<T>(config: WestRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T>(config: WestRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T>(config: WestRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T>(config: WestRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default WestRequest
