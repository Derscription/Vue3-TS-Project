import { ref } from "vue"
import PageModal from "@/components/page-modal"

import type { UsePageModalResult, CallbackFn } from "./type/types"

export function usePageModal(
  newCallback?: CallbackFn,
  editCallback?: CallbackFn
): UsePageModalResult {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleNewData = () => {
    defaultInfo.value = {}

    newCallback && newCallback()

    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }

  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }

    editCallback && editCallback(item)

    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
