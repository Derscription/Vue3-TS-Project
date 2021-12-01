import westRequest from "../index"
import {
  IAccountLoginActionPayload as IAccount,
  IResponseDataType,
  ILoginReturnDataType,
  IUserInfoType,
  IUserMenusType
} from "./types"

enum LoginAPI {
  AccountLogin = "/login",
  UserLoginInfo = "/users/", // 用法：users/id
  UserMenus = "/role/" // 用法：role/id/menu
}

// 用户登录
export function accountLoginRequest(
  account: IAccount
): Promise<IResponseDataType<ILoginReturnDataType>> {
  return westRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 用户信息
export function requestUserInfoById(
  id: number
): Promise<IResponseDataType<IUserInfoType>> {
  return westRequest.get({
    url: LoginAPI.UserLoginInfo + id,
    showLoading: false
  })
}

// 用户菜单
export function requestUserMenusByRoleId(
  id: number
): Promise<IResponseDataType<IUserMenusType[]>> {
  return westRequest.get({
    url: LoginAPI.UserMenus + id + "/menu",
    showLoading: false
  })
}
