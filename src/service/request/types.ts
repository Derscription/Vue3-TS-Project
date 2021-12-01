import type { AxiosRequestConfig, AxiosResponse } from "axios"

export interface WestRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface WestRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: WestRequestInterceptors<T>
  showLoading?: boolean
}
