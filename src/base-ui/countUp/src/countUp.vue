<template>
  <div class="count-up">
    <span ref="spanRef"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue"
import { CountUp } from "countup.js"

import type { CountUpOptions } from "countup.js"

const props = defineProps<{
  count: number
  options: CountUpOptions
}>()

// 默认配置
const defaultOptions: CountUpOptions = {
  decimalPlaces: 2, // 保留两位小数
  duration: 2, // 动画时长
  separator: ",", // 千位分割
  decimal: ".", // 小数分割
  prefix: "￥" // 单位
}

const spanRef = ref<HTMLElement>()

// 组件挂载完成后调用
onMounted(() => {
  let countUpInstance: CountUp

  // 对数据进行监听，看是否有改变，如果有改变，则更新数据，重新执行动画
  watch(
    () => props.count,
    () => {
      // 当数据发生改变，重新执行动画
      countUpInstance.update(props.count)
    }
  )

  // 准备配置数据
  const options = Object.assign(defaultOptions, props.options)
  // 创建动画实例
  if (spanRef.value) {
    countUpInstance = new CountUp(spanRef.value, props.count, options)
    // 开始执行动画
    countUpInstance.start()
  }
})
</script>

<style scoped lang="less"></style>
