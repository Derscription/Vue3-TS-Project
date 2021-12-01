export type { IAccountLoginActionPayload } from "@/store/modules/login/login-types"

export interface ILoginReturnDataType {
  id: number
  name: string
  token: string
}

interface IUserInfoDepartmentType {
  createAt?: Date
  id: number
  leader: string
  name: string
  parentId?: number
  updateAt?: Date
}

interface IUserInfoRoleType {
  createAt?: Date
  id: number
  intro: string
  name: string
  updateAt?: Date
}

export interface IUserInfoType {
  cellphone: number
  createAt?: Date
  department: IUserInfoDepartmentType
  enable: number
  id: number
  name: string
  realname: string
  role: IUserInfoRoleType
  updateAt?: Date
}

export interface IUserMenusChildrenOfChildrenType
  extends IUserMenusChildrenType {
  permission: string
}

export interface IUserMenusChildrenType {
  children?: IUserMenusChildrenOfChildrenType[]
  id: number
  name: string
  parentId: number
  sort?: number
  type: number
  url?: string
}

export interface IUserMenusType {
  children?: IUserMenusChildrenType[]
  icon: string
  id: number
  name: string
  sort: number
  type: number
  url: string
}

export interface IResponseDataType<T = any> {
  code: number
  data: T
}
