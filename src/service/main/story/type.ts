export interface IStoryListDataType<T = any> {
  code: number
  data: {
    list: T
    totalCount: number
  }
}
