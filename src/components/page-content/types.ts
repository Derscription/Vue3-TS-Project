export type { ITableConfigType } from "@/base-ui/table/type/types"
export type { IPageRoleListDataType } from "@/store/modules/main/system/system-type"

// users
interface IUsersQueryInfoType {
  cellphone?: string
  createAt?: Date
  enable?: number
  id?: string
  name?: string
  realname?: string
}

export type QueryInfoType = IUsersQueryInfoType
