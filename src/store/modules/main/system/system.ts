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
      // 1.??????pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 2.?????????????????????
      // ????????????????????????
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.??????????????????state???
      const { list, totalCount } = pageResult.data

      // ???????????????
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async deletePageData(context, payload: ISystemDeletePageDataType) {
      try {
        // 1.??????pageName???id
        // pageName -> /users
        // id -> /users/id
        const { pageName, id } = payload
        const pageUrl = `/${pageName}/${id}`

        // 2.????????????????????????
        await deletePageData(pageUrl)

        // 3.????????????????????????
        ElMessage({
          type: "success",
          message: "????????????!"
        })

        // 4.???????????????????????????
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
          message: "????????????! ?????????????????????"
        })
      }
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.?????????????????????
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      console.log(newData)
      await createPageData(pageUrl, newData)

      // 2.?????????????????????
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.?????????????????????
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.?????????????????????
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
