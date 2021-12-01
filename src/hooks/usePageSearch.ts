import { ref } from "vue"
import PageContent from "@/components/page-content"

import type { QueryInfoType, UsePageSearchResult } from "./type/types"

export function usePageSearch(): UsePageSearchResult {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo: QueryInfoType) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick]
}
