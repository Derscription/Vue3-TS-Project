<template>
  <div class="department">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="department"
      :headerTitle="contentTableConfig.headerTitle"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <PageModal
      ref="pageModalRef"
      :modalConfig="modalConfigComputed"
      :defaultInfo="defaultInfo"
      pageName="department"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue"
import { useStore } from "@/store"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/usePageSearch"
import { usePageModal } from "@/hooks/usePageModal"

export default defineComponent({
  name: "department",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()

    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    // 处理登录、刷新时，vuex没有部门和角色列表信息
    onMounted(() => {
      if (store.state.entireDepartment.length === 0) {
        store.dispatch("getInitialDataAction")
      }
    })

    // 2.动态添加部门和角色列表
    const modalConfigComputed = computed(() => {
      // 修改parentId.options属性值
      const parentIdItem = modalConfig.formItems.find(
        (item) => item.field === "parentId"
      )
      if (parentIdItem) {
        parentIdItem.options = store.state.entireMenu.map((item) => ({
          title: item.name,
          value: item.id
        }))
      }

      return modalConfig
    })

    return {
      pageContentRef,
      pageModalRef,
      defaultInfo,
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      modalConfigComputed,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped lang="less"></style>
