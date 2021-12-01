<template>
  <div class="category">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <PageContent
      ref="pageContentRef"
      pageName="category"
      :headerTitle="contentTableConfig.headerTitle"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <PageModal
      ref="pageModalRef"
      pageName="category"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/usePageSearch"
import { usePageModal } from "@/hooks/usePageModal"

export default defineComponent({
  name: "category",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    return {
      pageContentRef,
      pageModalRef,
      defaultInfo,
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped lang="less"></style>
