<template>
  <div class="card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span :style="titleStyle">{{ title }}</span>
          <slot name="HeaderRight"></slot>
        </div>

        <slot name="HeaderContent"></slot>
      </template>
      <div class="item">
        <slot name="CardBottom"></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue"

withDefaults(
  defineProps<{
    title: string
    titleStyle?: {
      color?: string
      fontSize?: string
    }
  }>(),
  {
    title: "Title"
  }
)
</script>

<style scoped lang="less">
.card {
  ::v-deep .el-card__header {
    padding: 10px 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
  }

  .item {
    margin-bottom: 10px;
  }
}
</style>
