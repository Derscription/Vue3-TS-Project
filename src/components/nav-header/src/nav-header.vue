<template>
  <div class="nav-header">
    <!-- 左边图标切换 -->
    <template v-if="true">
      <el-icon class="fold-menu" :size="30" v-if="isFold">
        <fold @click="handleFoldClick" />
      </el-icon>
      <el-icon class="fold-menu" :size="30" v-else>
        <expand @click="handleFoldClick" />
      </el-icon>
    </template>

    <div class="content">
      <!-- 面包屑 -->
      <WestBreadcrumb :breadcrumbs="breadcrumbs" />
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useStore } from "@/store"
import { useRoute } from "vue-router"

import UserInfo from "./cnps/user-info.vue"
import WestBreadcrumb from "@/base-ui/breadcrumb"

import { pathMapBreadcrumbs } from "@/utils/map-menus"

export default defineComponent({
  emits: ["foldChange"],
  components: {
    UserInfo,
    WestBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }

    // 面包屑的数据类型 [{name: "", path: ""}]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    cursor: pointer;
  }

  .content {
    flex: 1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
