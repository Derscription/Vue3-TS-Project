<template>
  <div class="user">
    <!-- search 搜索部分 -->
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />

    <!-- content 列表展示部分 -->
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      :headerTitle="contentTableConfig.headerTitle"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <!-- 自定义状态栏展示的内容 -->
      <template #status="scope">
        <el-button size="mini" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? "已启用" : "已禁用" }}
        </el-button>
      </template>
    </PageContent>

    <!-- 模态框 -->
    <PageModal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigComputed"
      :defaultInfo="defaultInfo"
    ></PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue"
import { useStore } from "@/store"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/usePageSearch"
import { usePageModal } from "@/hooks/usePageModal"

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()
    // 调用hook 执行搜索和重置操作
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // * 独自修复的Bug onMounted组件挂载完成时调用
    // 处理登录、刷新时，vuex没有部门和角色列表信息
    onMounted(() => {
      if (store.state.entireDepartment.length === 0) {
        store.dispatch("getInitialDataAction")
      }
    })

    // pageModal相关的hook逻辑
    // 1.处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      )

      if (passwordItem) passwordItem.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      )

      if (passwordItem) passwordItem.isHidden = true
    }

    // 2.动态添加部门和角色列表
    const modalConfigComputed = computed(() => {
      // 修改departmentItem.options属性值
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === "departmentId"
      )
      if (departmentItem) {
        departmentItem.options = store.state.entireDepartment.map((item) => {
          return { title: item.name, value: item.id }
        })
      }
      // 修改roleItem.options属性值
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === "roleId"
      )
      if (roleItem) {
        roleItem.options = store.state.entireRole.map((item) => {
          return { title: item.name, value: item.id }
        })
      }

      return modalConfig
    })

    // 3.调用hook, 执行新建和编辑，获取公共变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      pageModalRef,
      modalConfigComputed,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
