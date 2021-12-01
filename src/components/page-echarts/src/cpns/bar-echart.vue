<template>
  <div class="bar-echart">
    <BaseEcharts :options="barOptions" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue"
import BaseEcharts from "@/base-ui/echarts"
import * as echarts from "echarts"

import type { ComputedRef, EChartsOption } from "../../types"

const props = defineProps<{
  title?: string
  xLabels: string[]
  barData: number[]
}>()

const barOptions: ComputedRef<EChartsOption> = computed(() => {
  return {
    title: {
      text: props.title ?? ""
    },
    xAxis: {
      data: props.xLabels,
      axisLabel: {
        inside: true,
        color: "#fff"
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#999"
      }
    },
    dataZoom: [
      {
        type: "inside"
      }
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" }
            ])
          }
        },
        data: props.barData
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
