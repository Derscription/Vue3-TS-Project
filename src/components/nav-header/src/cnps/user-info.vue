<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span class="title">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
          <el-dropdown-item divided @click="handleExitClick">
            <el-icon class="user-info-icon"><circle-close /></el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"
import { useRouter } from "vue-router"

import localCache from "@/utils/cache"

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo?.name)

    const router = useRouter()
    const handleExitClick = () => {
      localCache.clearCache()
      router.replace("/login")
    }

    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  cursor: pointer;

  .el-dropdown-link {
    display: flex;
    align-items: center;

    .title {
      margin-left: 5px;
    }
  }
}

.user-info-icon {
  margin-right: 0 !important;
}

::v-deep .el-dropdown-menu__item:last-child:hover {
  color: red;
}
</style>
