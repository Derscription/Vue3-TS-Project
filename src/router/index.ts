import { createRouter, createWebHistory } from "vue-router"
import localCache from "@/utils/cache"
import { firstMenu } from "@/utils/map-menus"

import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue")
  },
  {
    path: "/:pathMatch(.*)*", // 当路由不存在时，跳转到的页面
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// 导航守卫
// 判断是否登录
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token")
    if (!token) {
      return "/login"
    }

    // console.log(router.getRoutes())

    // 重定向路由
    if (to.path === "/main") {
      return firstMenu.url
    }
  }
})

export default router
