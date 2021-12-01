import * as echarts from "echarts"
import ChinaMapData from "../data/china.json"

import type { EChartsOption } from "../type/types"

// 注册地图，并传递地图数据
echarts.registerMap("china", ChinaMapData)

export default function (el: HTMLElement) {
  const echartsInstance = echarts.init(el)

  const setOptions = (options: EChartsOption) => {
    echartsInstance.setOption(options)
  }

  // 给外部一个方法，用来更新图表大小
  const updateSize = () => {
    // 调用echart实例的resize方法，使图表随窗口大小的改变而改变
    echartsInstance.resize()
  }

  // 监听浏览器窗口大小是否发生改变
  window.addEventListener("resize", () => {
    // 调用echart实例的resize方法，使图表随窗口大小的改变而改变
    echartsInstance.resize()
  })

  return {
    echartsInstance,
    setOptions,
    updateSize
  }
}
