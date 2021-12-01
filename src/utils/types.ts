import type {
  IUserMenusType,
  IUserMenusChildrenType,
  IUserMenusChildrenOfChildrenType
} from "@/service/login/types"
import type { IWestBreadcrumbType } from "@/base-ui/breadcrumb/type/types"
import type { RouteRecordRaw } from "vue-router"

// 定义类型
type currentUserMenusType =
  | IUserMenusType[]
  | IUserMenusChildrenType[]
  | IUserMenusChildrenOfChildrenType[]

type matchingMenuType =
  | IUserMenusType
  | IUserMenusChildrenType
  | IUserMenusChildrenOfChildrenType

export {
  IUserMenusType,
  IUserMenusChildrenType,
  IUserMenusChildrenOfChildrenType,
  IWestBreadcrumbType,
  RouteRecordRaw,
  currentUserMenusType,
  matchingMenuType
}
