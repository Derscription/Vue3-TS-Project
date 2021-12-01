import type { Ref } from "vue"
import type { QueryInfoType } from "@/components/page-content/types"

export type { QueryInfoType }

export type UsePageSearchResult = [
  Ref<any>,
  () => void,
  (queryInfo: QueryInfoType) => void
]

export type UsePageModalResult = [
  Ref<any>,
  Ref<any>,
  () => void,
  (item: any) => void
]

export type CallbackFn = (item?: any) => void
