import westRequest from "@/service/index"

import type {
  IDashboardDataType,
  ItopPanelDatasType,
  ICategoryGoodsCountType,
  CategoryGoodsSaleType,
  ICategoryGoodsFavorType,
  IAddressGoodsSaleType
} from "./types"

enum DashboardAPI {
  amountList = "/goods/amount/list",
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale"
}

export function getAmountList(): Promise<
  IDashboardDataType<ItopPanelDatasType[]>
> {
  return westRequest.get({
    url: DashboardAPI.amountList
  })
}

export function getCategoryGoodsCount(): Promise<
  IDashboardDataType<ICategoryGoodsCountType[]>
> {
  return westRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale(): Promise<
  IDashboardDataType<CategoryGoodsSaleType[]>
> {
  return westRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor(): Promise<
  IDashboardDataType<ICategoryGoodsFavorType[]>
> {
  return westRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale(): Promise<
  IDashboardDataType<IAddressGoodsSaleType[]>
> {
  return westRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
