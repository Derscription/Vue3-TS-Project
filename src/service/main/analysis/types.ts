export type {
  ICategoryGoodsCountType,
  CategoryGoodsSaleType,
  ICategoryGoodsFavorType,
  IAddressGoodsSaleType,
  ItopPanelDatasType
} from "@/store/modules/main/analysis/dashboard/dashboard-type"

export interface IDashboardDataType<T = any> {
  code: number
  data: T
}
