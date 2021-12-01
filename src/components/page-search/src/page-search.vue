<template>
  <div class="page-search">
    <WestForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>

      <template #footer>
        <div class="handle-btns">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
          >
            搜索
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-refresh"
            @click="handleResetClick"
          >
            重置
          </el-button>
        </div>
      </template>
    </WestForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue"
import WestForm from "@/base-ui/form"

import type { IWestForm } from "../types"

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object as PropType<IWestForm>,
      required: true
    }
  },
  components: {
    WestForm
  },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: { [field: string]: string } = {}
    formItems.forEach((item) => {
      formOriginData[item.field] = ""
    })

    const formData = ref(formOriginData)

    // 2.优化二：当用户点击重置以后
    const handleResetClick = () => {
      // 利用双向绑定的方式，修改属性的值
      /* for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      } */
      formData.value = formOriginData
      emit("resetBtnClick")
    }

    // 3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      emit("queryBtnClick", formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  .header {
    color: red;
  }

  .handle-btns {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
