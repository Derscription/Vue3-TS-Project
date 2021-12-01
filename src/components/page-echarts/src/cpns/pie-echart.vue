<template>
  <div class="pie-echart">
    <BaseEcharts :options="pieOptions" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue"
import BaseEcharts from "@/base-ui/echarts"

import type {
  ComputedRef,
  EChartsOption,
  IEchartOptionsSeriesDataType
} from "../../types"

const props = defineProps<{
  pieData: IEchartOptionsSeriesDataType[]
}>()

const pieOptions: ComputedRef<EChartsOption> = computed(() => {
  return {
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "horizontal",
      left: "left"
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
