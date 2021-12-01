import { Module } from "vuex"
import { ElMessage } from "element-plus"
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/main/system/system"

import type {
  ISystemState,
  IRootState,
  ISystemPageListActionType,
  IPageUserListDataType,
  IPageRoleListDataType,
  IPageDepartmentListDataType,
  IPageCategoryListDataType,
  IPageGoodsListDataType,
  IPageMenuListDataType,
  ISystemDeletePageDataType,
  IStoryListType
} from "./system-type"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      storyList: [],
      storyCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: IPageUserListDataType[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: IPageRoleListDataType[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeDepartmentList(state, departmentList: IPageDepartmentListDataType[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    },
    changeCategoryList(state, categoryList: IPageCategoryListDataType[]) {
      state.categoryList = categoryList
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount
    },
    changeGoodsList(state, goodsList: IPageGoodsListDataType[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: IPageMenuListDataType[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeStoryList(state, storyList: IStoryListType[]) {
      state.storyList = storyList
    },
    changeStoryCount(state, storyCount: number) {
      state.storyCount = storyCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => (state as any)[`${pageName}List`]
    },
    pageListCount(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`]
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: ISystemPageListActionType) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 2.对页面发送请求
      // 获取用户列表数据
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data

      // 首字符大写
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async deletePageData(context, payload: ISystemDeletePageDataType) {
      try {
        // 1.获取pageName和id
        // pageName -> /users
        // id -> /users/id
        const { pageName, id } = payload
        const pageUrl = `/${pageName}/${id}`

        // 2.调用删除网络请求
        await deletePageData(pageUrl)

        // 3.告诉用户删除成功
        ElMessage({
          type: "success",
          message: "删除成功!"
        })

        // 4.重新请求最新的数据
        context.dispatch("getPageListAction", {
          pageName,
          queryInfo: {
            offset: 0,
            size: 10
          }
        })
      } catch (error) {
        ElMessage({
          type: "error",
          message: "删除失败! 请检查当前网络"
        })
      }
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      console.log(newData)
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
