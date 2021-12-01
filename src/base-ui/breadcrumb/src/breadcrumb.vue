<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"

import type { IWestBreadcrumbType } from "../type/types"

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IWestBreadcrumbType[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
