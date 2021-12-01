import type {
  ILoginState,
  ISystemState
} from "@/store/modules/login/login-types"
import type { IPageRoleListDataType } from "@/store/modules/main/system/system-type"
import type { IDashboardState } from "@/store/modules/main/analysis/dashboard/dashboard-type"

export type { IPageRoleListDataType }

export interface IRootState {
  entireDepartment: IDepartmentListType[]
  entireRole: IPageRoleListDataType[]
  entireMenu: IMenusListType[]
}

export interface IDepartmentListType {
  id: number
  leader: string
  name: string
  parentId: number
  createAt: Date
  updateAt: Date
}

interface IMenusChildrenType {
  children: IMenusChildrenType[] | undefined | null
  id: number
  name: string
  parentId: number
  sort: number
  type: number
  url: string
  createAt?: Date
  updateAt?: Date
}

export interface IMenusListType {
  children: IMenusChildrenType[]
  id: number
  name: string
  icon: string
  sort: number
  type: number
  url: string
  createAt: Date
  updateAt: Date
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
