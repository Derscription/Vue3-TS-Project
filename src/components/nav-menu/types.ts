import type {
  IUserMenusType,
  IUserMenusChildrenType,
  IUserMenusChildrenOfChildrenType
} from "@/service/login/types"

// 定义类型
type currentClickMenusType =
  | IUserMenusType
  | IUserMenusChildrenType
  | IUserMenusChildrenOfChildrenType

export { currentClickMenusType }
