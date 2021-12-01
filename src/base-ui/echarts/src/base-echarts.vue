<template>
  <div class="base-echarts">
    <div ref="echartDivRef" :style="{ width, height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from "vue"

import useEcharts from "../hook/useECharts"

import type { EChartsOption } from "../type/types"

// 定义props
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  {
    width: "100%",
    height: "360px"
  }
)

const echartDivRef = ref<HTMLElement>()

// 调用生命周期函数，onMounted组件挂载完成后调用
onMounted(() => {
  if (echartDivRef.value) {
    const { setOptions } = useEcharts(echartDivRef.value)

    watchEffect(() => {
      setOptions(props.options)
    })
  }
})
</script>

<style scoped lang="less"></style>
