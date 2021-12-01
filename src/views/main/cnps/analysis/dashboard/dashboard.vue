<template>
  <div class="dashboard">
    <PageTotalData />
    <PageECharts />
  </div>
</template>

<script setup lang="ts">
import PageTotalData from "@/components/page-total-data"
import PageECharts from "@/components/page-echarts"
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f0f2f5;
}
</style>
