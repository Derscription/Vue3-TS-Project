import { Module } from "vuex"

import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  getAddressGoodsSale
} from "@/service/main/analysis/dashboard"

import type {
  IDashboardState,
  IRootState,
  ItopPanelDatasType,
  ICategoryGoodsCountType,
  CategoryGoodsSaleType,
  ICategoryGoodsFavorType,
  IAddressGoodsSaleType
} from "./dashboard-type"

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      topPanelDatas: [],
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeTopPanelDatas(state, list: ItopPanelDatasType[]) {
      state.topPanelDatas = list
    },
    changeCategoryGoodsCount(state, list: ICategoryGoodsCountType[]) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list: CategoryGoodsSaleType[]) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list: ICategoryGoodsFavorType[]) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list: IAddressGoodsSaleType[]) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      try {
        const topPanelDatas: any = await getAmountList()
        commit("changeTopPanelDatas", topPanelDatas.data)
        const categoryCountResult = await getCategoryGoodsCount()
        commit("changeCategoryGoodsCount", categoryCountResult.data)
        const categorySaleResult = await getCategoryGoodsSale()
        commit("changeCategoryGoodsSale", categorySaleResult.data)
        const categoryFavorResult = await getCategoryGoodsFavor()
        commit("changeCategoryGoodsFavor", categoryFavorResult.data)
        const addressResult = await getAddressGoodsSale()
        commit("changeAddressGoodsSale", addressResult.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default dashboardModule
