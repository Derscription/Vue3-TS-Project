<template>
  <div class="list">
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="story"
      :isHeaderTitle="false"
      :isPerfect="false"
      @editBtnClick="handleEditData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { ElMessage } from "element-plus"

import PageContent from "@/components/page-content"

import { contentTableConfig } from "./config/content.config"

export default defineComponent({
  name: "list",
  components: {
    PageContent
  },
  setup() {
    // TODO 编辑操作，请求还在开发中
    const handleEditData = () => {
      ElMessage({
        type: "warning",
        message: "当前功能还在开发中，请耐心等待!"
      })
    }

    return {
      contentTableConfig,
      handleEditData
    }
  }
})
</script>

<style scoped lang="less">
.list {
  .page-content {
    border: none;
  }
}
</style>
