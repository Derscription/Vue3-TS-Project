<template>
  <div class="descriptions">
    <el-descriptions :title="title" :column="column" border>
      <template v-for="(item, index) in descriptionsList" :key="index">
        <el-descriptions-item
          :label="item.name"
          label-align="left"
          align="left"
          :width="width"
        >
          <el-tag size="small">{{ item.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue"
import type { ITableDataType } from "../types"

withDefaults(
  defineProps<{
    column: number
    width?: string
    title?: string
    descriptionsList: ITableDataType[]
  }>(),
  {
    title: "",
    width: "150px"
  }
)
</script>

<style scoped lang="less"></style>
