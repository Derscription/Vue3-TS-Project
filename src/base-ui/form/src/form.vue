<template>
  <div class="west-form">
    <!-- 头部 -->
    <div class="header">
      <slot name="header"> </slot>
    </div>

    <!-- 表单部分 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- input和password输入框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>

              <!-- select下拉框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.title"
                    :label="option.title"
                    :value="option.value"
                  >
                  </el-option>
                </el-select>
              </template>

              <!-- datepicker选择时间 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 尾部 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import type { IWestFormItemType } from "../type/types"

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IWestFormItemType[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 40px" })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // 利用双向绑定的方式，实现数据的重置
    /* const formData = ref({ ...props.modelValue })

    watch(
      formData,
      (newValue) => {
        return emit("update:modelValue", newValue)
      },
      {
        deep: true
      }
    ) */

    // 不利用v-model的语法糖，来实现数据的重置
    const handleValueChange = (value: any, field: string) => {
      emit("update:modelValue", { ...props.modelValue, [field]: value })
    }

    return {
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.west-form {
  padding-top: 20px;
}
</style>
