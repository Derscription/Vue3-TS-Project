import { Module } from "vuex"
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login"
import localCache from "@/utils/cache"
import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus"
import router from "@/router"

import type {
  IAccountLoginActionPayload,
  ILoginState,
  IRootState,
  IUserInfoType,
  IUserMenusType
} from "./login-types"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: null,
      userMenus: [],
      permission: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: IUserInfoType) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: IUserMenusType[]) {
      state.userMenus = userMenus

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      // 动态注册路由
      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permission = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccountLoginActionPayload) {
      try {
        // 1.实现登录逻辑
        // 发送请求，获取token
        const loginResult = await accountLoginRequest(payload)
        const { id, token } = loginResult.data
        commit("changeToken", token)
        localCache.setCache("token", token)

        // 2.请求用户信息
        const userInfoResult = await requestUserInfoById(id)
        const userInfo = userInfoResult.data
        commit("changeUserInfo", userInfo)
        localCache.setCache("userInfo", userInfo)

        // 3.请求用户菜单
        const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
        const userMenus = userMenusResult.data
        commit("changeUserMenus", userMenus)
        localCache.setCache("userMenus", userMenus)

        // 4.跳转首页
        router.push("/main")
      } catch (error) {
        console.log(error)
      }
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("changeToken", token)
      }
      const userInfo = localCache.getCache("userInfo")
      if (userInfo) {
        commit("changeUserInfo", userInfo)
      }
      const userMenus = localCache.getCache("userMenus")
      if (userMenus) {
        commit("changeUserMenus", userMenus)
      }
    }
  }
}

export default loginModule
