import type { IUserInfoType, IUserMenusType } from "@/service/login/types"
import type { IRootState } from "../../types"
import type { ISystemState } from "../main/system/system-type"
import type { IProductState } from "../main/product/product-type"

export {
  IRootState,
  IUserInfoType,
  IUserMenusType,
  ISystemState,
  IProductState
}

export interface ILoginState {
  token: string
  userInfo: IUserInfoType | null
  userMenus: IUserMenusType[]
  permission: string[]
}

export interface IAccountLoginActionPayload {
  name: string
  password: string
}
