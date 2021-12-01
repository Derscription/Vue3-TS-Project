<template>
  <div class="line-echart">
    <BaseEcharts :options="lineOptions" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue"
import BaseEcharts from "@/base-ui/echarts"

import type { ComputedRef, EChartsOption } from "../../types"

const props = defineProps<{
  title?: string
  lineData: number[]
  xLabels: string[]
}>()

const lineOptions: ComputedRef<EChartsOption> = computed(() => {
  return {
    title: {
      text: props.title ?? ""
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true }
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    legend: {
      data: ["分类销量"]
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: props.xLabels
      }
    ],
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "分类销量",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          focus: "series"
        },
        data: props.lineData
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
