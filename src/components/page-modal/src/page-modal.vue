<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <WestForm v-model="formData" v-bind="modalConfig"></WestForm>
      <!-- 设置权限用的插槽 -->
      <slot name="jurisdiction"></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue"
import WestForm from "@/base-ui/form"
import { useStore } from "@/store"

import type { IWestForm } from "../types"

export default defineComponent({
  props: {
    modalConfig: {
      type: Object as PropType<IWestForm>,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    WestForm
  },
  setup(props) {
    const dialogVisible = ref(false)

    const formData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        props.modalConfig.formItems.forEach((item) => {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        })
      }
    )

    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false

      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped lang="less"></style>
