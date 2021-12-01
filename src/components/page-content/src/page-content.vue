<template>
  <div class="page-content">
    <WestTable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      @selectionChange="handleSelectionChange"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <!-- 自定义头部内容 -->
      <template #headerHandler>
        <!-- 判断是否有权限新建用户 -->
        <template v-if="isCreate">
          <!-- 判断是否显示新建功能 -->
          <template v-if="isHeaderTitle">
            <el-button type="success" size="medium" @click="handleNewClick">
              {{ headerTitle }}
            </el-button>
          </template>
        </template>
      </template>

      <!-- 2.列中的插槽 -->
      <!-- 自定义创建时间展示的内容 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>

      <!-- 自定义更新时间展示的内容 -->
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>

      <!-- 自定义操作功能 -->
      <template #handler="scope">
        <div class="handle-btns">
          <!-- 判断是否有权限对数据进行编辑 -->
          <template v-if="isUpdate">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEditClick(scope.row)"
            >
              编辑
            </el-button>
          </template>
          <!-- 判断是否有权限对数据进行删除 -->
          <template v-if="isDelete">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDeleteClick(scope.row)"
            >
              删除
            </el-button>
          </template>
        </div>
      </template>

      <!-- 动态插槽，用于支持扩展 -->
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 判断contentTableConfig中的slotName是否有值 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </WestTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from "vue"
import { ElMessageBox } from "element-plus"
import { ElMessage } from "element-plus"

import { useStore } from "@/store"

import WestTable from "@/base-ui/table"

import { usePermission } from "@/hooks/usePermission"

import type { ITableConfigType, QueryInfoType } from "../types"

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object as PropType<ITableConfigType>,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    headerTitle: {
      type: String,
      default: ""
    },
    isHeaderTitle: {
      type: Boolean,
      default: true
    },
    isPerfect: {
      type: Boolean,
      default: true
    }
  },
  components: {
    WestTable
  },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore()

    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, "create")
    const isUpdate = usePermission(props.pageName, "update")
    const isDelete = usePermission(props.pageName, "delete")
    const isQuery = usePermission(props.pageName, "query")

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2.发送网络请求
    const getPageData = (queryInfo: QueryInfoType = {}) => {
      if (!isQuery) return
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从vuex中获取数据
    const dataList = computed(() =>
      store.getters["system/pageListData"](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters["system/pageListCount"](props.pageName)
    )

    // 处理选中的数据
    const handleSelectionChange = (value: any[]) => {
      console.log(value)
    }

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig.propList.filter((item) => {
      if (item.slotName === "createAt") return false
      if (item.slotName === "updateAt") return false
      if (item.slotName === "handler") return false
      return true
    })

    // 5.删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      // 判断是否有删除功能
      if (props.isPerfect) {
        // 弹出一个对话框，给用户一个反悔的机会
        ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            store.dispatch("system/deletePageData", {
              pageName: props.pageName,
              id: item.id
            })
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "已取消删除!"
            })
          })
      } else {
        ElMessage({
          type: "warning",
          message: "当前功能还在开发中，请耐心等待!"
        })
      }
    }

    const handleNewClick = () => {
      emit("newBtnClick")
    }

    const handleEditClick = (item: any) => {
      emit("editBtnClick", item)
    }

    return {
      isCreate,
      isUpdate,
      isDelete,
      pageInfo,
      dataList,
      dataCount,
      otherPropSlots,
      handleSelectionChange,
      getPageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
