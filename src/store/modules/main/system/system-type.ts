export type { IRootState } from "@/store/types"

export interface IPageUserListDataType {
  cellphone: number
  createAt: Date
  departmentId: number
  enable: number
  id: number
  name: string
  realname: string
  roleId: number
  updateAt: Date
}

export interface IRoleListDataMenuListChildrenType
  extends IRoleListDataMenuListType {
  parentId: number
}

export interface IRoleListDataMenuListType {
  children: IRoleListDataMenuListChildrenType[]
  icon: string
  id: number
  name: string
  sort: number
  type: number
  url: string
}

export interface IPageRoleListDataType {
  createAt: Date
  id: number
  intro: string
  menuList: IRoleListDataMenuListType[]
  name: string
  updateAt: Date
}

export interface IPageDepartmentListDataType {
  createAt: Date
  id: number
  leader: string
  name: string
  parentId: number
  updateAt: Date
}

export interface IPageCategoryListDataType {
  createAt: Date
  id: number
  name: string
  updateAt: Date
}

export interface IPageGoodsListDataType {
  address: string
  categoryId: number
  createAt: Date
  desc: string
  favorCount: number
  id: number
  imgUrl: string
  inventoryCount: number
  name: string
  newPrice: string
  oldPrice: string
  saleCount: number
  status: number
  updateAt: Date
}

interface IPageMenuListChildrenOfChildrenType {
  createAt: Date
  id: number
  name: "创建用户"
  parentId: number
  permission: string
  sort: number
  type: number
  updateAt: Date
  url: string
}

interface IPageMenuListChildrenType {
  children?: IPageMenuListChildrenOfChildrenType[]
  id: number
  name: string
  parentId: number
  sort: number
  type: number
  url: string
  createAt?: Date
  updateAt?: Date
}

export interface IPageMenuListDataType {
  children: IPageMenuListChildrenType[]
  id: number
  name: string
  icon: string
  sort: number
  type: number
  url: string
  createAt: Date
  updateAt: Date
}

export interface ISystemPageListActionType {
  pageName: string
  queryInfo: any
}

export interface ISystemDeletePageDataType {
  pageName: string
  id: number
}

export interface IStoryListType {
  content: string
  createAt: Date
  id: number
  title: string
}

export interface ISystemState {
  usersList: IPageUserListDataType[]
  usersCount: number
  roleList: IPageRoleListDataType[]
  roleCount: number
  departmentList: IPageDepartmentListDataType[]
  departmentCount: number
  categoryList: IPageCategoryListDataType[]
  categoryCount: number
  goodsList: IPageGoodsListDataType[]
  goodsCount: number
  menuList: IPageMenuListDataType[]
  menuCount: number
  storyList: IStoryListType[]
  storyCount: number
}
