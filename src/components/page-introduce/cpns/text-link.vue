<template>
  <div class="text-link">
    <ul class="text-link-ul">
      <template v-for="item in technologyStacks" :key="item.title">
        <li class="text-link-item">
          <span class="title">{{ item.title }} : </span>
          <el-link type="primary">{{ item.desp }}</el-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

import type { ITextArrayType } from "../types"

defineProps<{
  technologyStacks: ITextArrayType[]
}>()
</script>

<style scoped lang="less">
.text-link {
  display: flex;
  justify-content: flex-start;
  padding: 0 20px;

  .text-link-ul {
    padding: 0;
    margin: 0;

    .text-link-item {
      text-align: left;
      list-style-type: square;
      line-height: 30px;

      .title {
        margin-right: 20px;
      }
    }
  }
}
</style>
