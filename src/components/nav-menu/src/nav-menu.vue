<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.png" alt="logo" />
      <span class="title" v-if="!collapse">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical-demo"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :unique-opened="true"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 当item.type === 1 时，表示可以展开 -->
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuItemClick(subItem)"
              >
                <i v-if="subItem.icon" :class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 当item.type === 2 时，表示直接展示并可点击跳转 -->
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item
            :index="item.id + ''"
            @click="handleMenuItemClick(item)"
          >
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue"
import { useStore } from "@/store"
import { useRouter, useRoute } from "vue-router"
import { _recursePathMapToMenu } from "@/utils/map-menus"

import type { currentClickMenusType } from "../types"

// vuex - typescript => pinio

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)

    // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path

    // data
    const menu = _recursePathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu?.id + "")

    // event handle
    const handleMenuItemClick = (item: currentClickMenusType) => {
      router.push({
        path: item.url ?? "/not-found"
      })
    }

    return {
      userMenus,
      defaultValue,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: bold;
      color: white;
      line-height: 100% !important;
    }
  }

  // 目录
  .el-menu {
    border: none;

    .el-sub-menu {
      background-color: #001529 !important;
      // 二级菜单 ( 默认背景 )
      .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135 !important;
      }

      // hover 高亮
      .el-menu-item:hover {
        color: #fff !important; // 菜单
      }

      // 点击时的背景颜色
      .el-menu-item.is-active {
        color: #fff !important;
        background-color: #0a60bd !important;
      }
    }
  }
}
</style>
