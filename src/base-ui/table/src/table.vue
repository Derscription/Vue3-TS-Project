<template>
  <div class="west-table">
    <!-- header -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>

    <!-- main -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 是否可选中 -->
      <template v-if="showSelectColumn">
        <el-table-column
          type="selection"
          align="center"
          width="60"
        ></el-table-column>
      </template>

      <!-- 是否显示序号 -->
      <template v-if="showIndexColumn">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
      </template>

      <!-- 数据显示 -->
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- footer -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"

import type {
  IPropListType,
  IPropPageType,
  IPropChildrenPropsType
} from "../type/types"

export default defineComponent({
  props: {
    title: {
      type: String,
      defualt: ""
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<IPropListType[]>,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object as PropType<IPropPageType>,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    childrenProps: {
      type: Object as PropType<IPropChildrenPropsType>,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    // 将收集到的列表信息发送出去
    const handleSelectionChange = (value: any[]): void => {
      emit("selectionChange", value)
    }

    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage })
    }

    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize })
    }

    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.west-table {
  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-weight: bold;
      font-size: 20px;
    }

    .handler {
      align-items: center;
    }
  }

  .footer {
    margin-top: 15px;

    .el-pagination {
      text-align: right;
    }
  }
}
</style>
