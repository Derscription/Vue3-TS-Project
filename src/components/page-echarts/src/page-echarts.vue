<template>
  <div class="page-echarts">
    <el-row :gutter="10">
      <el-col :span="7">
        <WestCard title="分类商品数量(饼图)">
          <template #CardBottom>
            <ECharts.PieEchart :pieData="categoryGoodsCount" />
          </template>
        </WestCard>
      </el-col>
      <el-col :span="10">
        <WestCard title="不同城市商品销量">
          <template #CardBottom>
            <ECharts.MapEchart :mapData="addressGoodsSale" />
          </template>
        </WestCard>
      </el-col>
      <el-col :span="7">
        <WestCard title="分类商品数量(玫瑰图)">
          <template #CardBottom>
            <ECharts.RoseEchart :roseData="categoryGoodsCount" />
          </template>
        </WestCard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <WestCard title="分类商品的销量">
          <template #CardBottom>
            <ECharts.LineEchart v-bind="categoryGoodsSale" />
          </template>
        </WestCard>
      </el-col>
      <el-col :span="12">
        <WestCard title="分类商品的收藏">
          <template #CardBottom>
            <ECharts.BarEchart v-bind="categoryGoodsFavor" />
          </template>
        </WestCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "@/store"

import WestCard from "@/base-ui/card"
import * as ECharts from "./cpns"

import type {
  ICategoryGoodsCountType,
  CategoryGoodsSaleType,
  ICategoryGoodsFavorType,
  IAddressGoodsSaleType
} from "../types"

const store = useStore()
// 获取图表数据并保存在vuex中
store.dispatch("dashboard/getDashboardDataAction")

// 分类商品数量(饼图/玫瑰图)的数据
const categoryGoodsCount = computed(() =>
  store.state.dashboard.categoryGoodsCount.map(
    (item: ICategoryGoodsCountType) => {
      return { name: item.name, value: item.goodsCount }
    }
  )
)

// 分类商品销量的数据
const categoryGoodsSale = computed(() => {
  const xLabels: string[] = []
  const lineData: number[] = []

  store.state.dashboard.categoryGoodsSale.map((item: CategoryGoodsSaleType) => {
    xLabels.push(item.name)
    lineData.push(item.goodsCount)
  })

  return { xLabels, lineData }
})

// 分类商品收藏的数据
const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = []
  const barData: number[] = []

  store.state.dashboard.categoryGoodsFavor.map(
    (item: ICategoryGoodsFavorType) => {
      xLabels.push(item.name)
      barData.push(item.goodsFavor)
    }
  )

  return { xLabels, barData }
})

// 不同城市商品销量的数据
const addressGoodsSale = computed(() =>
  store.state.dashboard.addressGoodsSale.map((item: IAddressGoodsSaleType) => {
    return {
      name: item.address,
      value: item.count
    }
  })
)
</script>

<style scoped lang="less">
.page-echarts {
  .content-row {
    margin-top: 20px;
  }
}
</style>
