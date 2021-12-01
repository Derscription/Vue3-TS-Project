<template>
  <div class="menu">
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="menu"
      :headerTitle="contentTableConfig.headerTitle"
      :isHeaderTitle="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import PageContent from "@/components/page-content"
import { contentTableConfig } from "./config/content.config"

export default defineComponent({
  name: "west-menu",
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
