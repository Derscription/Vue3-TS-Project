<template>
  <div class="page-total-data">
    <el-row :gutter="10">
      <template v-for="item in panelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <WestCard
            :title="item.title"
            :titleStyle="{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px' }"
            class="west-card"
          >
            <!-- 标题右侧符号内容 -->
            <template #HeaderRight>
              <el-tooltip :content="item.tips" placement="top" effect="light">
                <el-icon class="warning-color"><warning /></el-icon>
              </el-tooltip>
            </template>

            <!-- 标题下面插槽的内容 -->
            <template #HeaderContent>
              <CountUp
                :count="item.number1"
                :options="
                  item.amount === 'saleroom' ? countUpOptions2 : countUpOptions1
                "
                class="page-count-up"
              />
            </template>

            <!-- Card的尾部插槽的内容 -->
            <template #CardBottom>
              <span class="card-bottom">
                {{ item.subtitle }}
                <CountUp
                  :count="item.number2"
                  :options="
                    item.amount === 'saleroom'
                      ? countUpOptions2
                      : countUpOptions1
                  "
                  class="card-bottom-data"
                ></CountUp>
              </span>
            </template>
          </WestCard>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "@/store"

import WestCard from "@/base-ui/card"
import CountUp from "@/base-ui/countUp"

const store = useStore()

// 获取顶部面板数据
const panelData = computed(() => store.state.dashboard.topPanelDatas)

const countUpOptions1 = {
  decimalPlaces: 0, // 保留两位
  prefix: "" // 单位
}
const countUpOptions2 = {
  decimalPlaces: 0, // 保留两位
  prefix: "￥" // 单位
}
</script>

<style scoped lang="less">
.page-total-data {
  margin-bottom: 20px;

  ::v-deep .west-card {
    .el-card {
      .el-card__body {
        padding: 10px 20px;

        .item {
          margin-bottom: 0;
        }
      }
    }
    .warning-color {
      color: rgba(0, 0, 0, 0.45);
    }

    .page-count-up {
      width: 100%;
      height: 100%;
      font-size: 26px;
      display: flex;
    }

    .card-bottom {
      display: flex;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      margin-bottom: 0;

      .card-bottom-data {
        margin-left: 8px;
      }
    }
  }
}
</style>
