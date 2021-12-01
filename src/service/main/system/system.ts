import westRequest from "@/service/index"

import type { ISystemDataType } from "./types"

// 获取数据的方法
export function getPageListData(
  url: string,
  queryInfo: any
): Promise<ISystemDataType> {
  //Promise<ISystemDataType<IPageListDataType[]>>
  return westRequest.post({
    url,
    data: queryInfo
  })
}

// 删除数据的方法
// url: /users/id
export function deletePageData(url: string): Promise<ISystemDataType> {
  return westRequest.delete({
    url
  })
}

// 创建数据的方法
export function createPageData(
  url: string,
  newData: any
): Promise<ISystemDataType> {
  return westRequest.post({
    url,
    data: newData
  })
}

// 编辑数据的方法
export function editPageData(
  url: string,
  editData: any
): Promise<ISystemDataType> {
  return westRequest.patch({
    url,
    data: editData
  })
}
