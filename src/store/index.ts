import { createStore, Store, useStore as useVuexStore } from "vuex"

import login from "./modules/login/login"
import system from "./modules/main/system/system"
import dashboard from "./modules/main/analysis/dashboard/dashboard"

import { getPageListData } from "@/service/main/system/system"

import type {
  IRootState,
  IStoreType,
  IDepartmentListType,
  IPageRoleListDataType,
  IMenusListType
} from "./types"

export const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list: IDepartmentListType[]) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list: IPageRoleListDataType[]) {
      state.entireRole = list
    },
    changeEntireMenu(state, list: IMenusListType[]) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const {
        data: { list: departmentList }
      } = await getPageListData("/department/list", {
        offset: 0,
        size: 1000
      })

      const {
        data: { list: roleList }
      } = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      })

      const {
        data: { list: menuList }
      } = await getPageListData("/menu/list", {})
      // 2.保存数据
      commit("changeEntireDepartment", departmentList)
      commit("changeEntireRole", roleList)
      commit("changeEntireMenu", menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

// 解决刷新使vuex中保存的数据消失
export function setupStore(): void {
  store.dispatch("login/loadLocalLogin")
}

// 解决使用原来的useStore没有类型的问题
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
