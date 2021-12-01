<template>
  <div class="goods">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      ref="pageContentRef"
      :headerTitle="contentTableConfig.headerTitle"
    >
      <!-- 自定义图片展示 -->
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>

      <!-- 自定义价格显示 -->
      <template #oldPrice="scope">{{ "￥" + scope.row.oldPrice }}</template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"

import { usePageSearch } from "@/hooks/usePageSearch"

export default defineComponent({
  name: "goods",
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    return {
      pageContentRef,
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less"></style>
