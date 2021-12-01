export type { EChartsOption } from "echarts"
export type { ComputedRef } from "vue"
export type {
  ICategoryGoodsCountType,
  CategoryGoodsSaleType,
  ICategoryGoodsFavorType,
  IAddressGoodsSaleType
} from "@/store/modules/main/analysis/dashboard/dashboard-type"

export interface IEchartOptionsSeriesDataType {
  name: string
  value: number | string | any
}
