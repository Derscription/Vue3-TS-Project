export type { IRootState } from "@/store/types"

export interface ItopPanelDatasType {
  amount: string
  number1: number
  number2: number
  subtitle: string
  tips: string
  title: string
}

export interface ICategoryGoodsCountType {
  id: number
  name: string
  goodsCount: number
}

export type CategoryGoodsSaleType = ICategoryGoodsCountType

export interface ICategoryGoodsFavorType {
  id: number
  name: string
  goodsFavor: number
}

export interface IAddressGoodsSaleType {
  address: string
  count: number
}

export interface IDashboardState {
  topPanelDatas: ItopPanelDatasType[]
  categoryGoodsCount: ICategoryGoodsCountType[]
  categoryGoodsSale: CategoryGoodsSaleType[]
  categoryGoodsFavor: ICategoryGoodsFavorType[]
  addressGoodsSale: IAddressGoodsSaleType[]
}
