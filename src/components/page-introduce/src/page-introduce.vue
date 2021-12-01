<template>
  <div class="page-introduce">
    <!-- 关于 -->
    <WestCard title="关于" class="west-card">
      <template #CardBottom>
        <div class="card-bottom-left">
          Vue3Admin 是基于 Vue3、Vuex、VueRouter、webpack、 ElementPlus
          、TypeScript、Echart5 等后台系统解决方案。
        </div>
      </template>
    </WestCard>

    <!-- 技术栈 -->
    <WestCard title="技术栈" class="west-card">
      <template #CardBottom>
        <TextLink :technologyStacks="technologyStacks" />
      </template>
    </WestCard>

    <!-- 生成环境依赖 -->
    <WestCard title="生成环境依赖" class="west-card">
      <template #CardBottom>
        <Descriptions :descriptionsList="productionData" :column="2" />
      </template>
    </WestCard>

    <!-- 开发环境依赖 -->
    <WestCard title="开发环境依赖" class="west-card">
      <template #CardBottom>
        <Descriptions :descriptionsList="developmentData" :column="2" />
      </template>
    </WestCard>

    <!-- 项目结构 -->
    <WestCard title="项目结构" class="west-card">
      <template #CardBottom>
        <pre class="west-card-pre">
          {{ projectDir }}
        </pre>
      </template>
    </WestCard>

    <!-- 项目规范 -->
    <WestCard title="项目规范" class="west-card">
      <template #CardBottom>
        <!-- 文件命名规范 -->
        <Descriptions
          :descriptionsList="fileStandard"
          :column="1"
          title="文件命名规范"
          class="west-card-descriptions"
        />

        <!-- 编写组件规范 -->
        <Descriptions
          :descriptionsList="assemblyStandard"
          :column="1"
          title="编写组件规范"
          class="west-card-descriptions"
        />
      </template>
    </WestCard>

    <!-- Git提交规范 -->
    <WestCard title="Git提交规范" class="west-card">
      <template #CardBottom>
        <Descriptions :descriptionsList="gitStandard" :column="1" />
      </template>
    </WestCard>
  </div>
</template>

<script setup lang="ts">
import WestCard from "@/base-ui/card"
import TextLink from "../cpns/text-link.vue"
import Descriptions from "../cpns/descriptions.vue"

import {
  technologyStacks,
  productionData,
  developmentData,
  projectDir,
  fileStandard,
  assemblyStandard,
  gitStandard
} from "../config"
</script>

<style scoped lang="less">
.page-introduce {
  background-color: #f0f2f5;
  .west-card {
    margin-bottom: 20px;

    ::v-deep .card-header {
      font-weight: bold;
    }

    ::v-deep .el-card__body {
      margin-bottom: 0;
    }

    .card-bottom-left {
      display: flex;
    }

    .west-card-pre {
      padding: 10px;
      text-align: left;
      background: #f0f0f0;
      margin: 0;
      font-family: Courier, monospace, "Microsoft YaHei";
    }

    .west-card-descriptions {
      ::v-deep .el-descriptions__title {
        font-weight: 400;
      }
    }

    .west-card-descriptions:nth-child(1) {
      margin-bottom: 20px;
    }
  }
}
</style>
