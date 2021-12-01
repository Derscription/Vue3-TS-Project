export interface ISystemDataType<T = any> {
  code: number
  data: {
    list: T
    totalCount: number
  }
}
