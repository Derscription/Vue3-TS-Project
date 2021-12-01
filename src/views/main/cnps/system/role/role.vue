<template>
  <div class="role">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      pageName="role"
      :headerTitle="contentTableConfig.headerTitle"
    />
    <PageModal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <!-- 设置权限 -->
      <template #jurisdiction>
        <div class="menu-tree">
          <el-tree
            ref="elTreeRef"
            :data="menus"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheckChange"
          />
        </div>
      </template>
    </PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, nextTick } from "vue"
import { useStore } from "@/store"
import { ElTree } from "element-plus"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hooks/usePageSearch"
import { usePageModal } from "@/hooks/usePageModal"

import { menuMapLeafKeys } from "@/utils/map-menus"

export default defineComponent({
  name: "role",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()
    // 解决进入页面没有数据的情况
    onMounted(() => {
      if (store.state.entireMenu.length === 0) {
        store.dispatch("getInitialDataAction")
      }
    })

    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // 处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    // 处理ElTree选中的数据
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...halfCheckedKeys, ...checkedKeys]
      otherInfo.value = { menuList }
    }

    return {
      pageContentRef,
      pageModalRef,
      elTreeRef,
      menus,
      otherInfo,
      defaultInfo,
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.role {
  .menu-tree {
    margin-left: 20px;
  }
}
</style>
