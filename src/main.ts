import { createApp } from "vue"
import router from "./router"
import { store, setupStore } from "./store"
import { globalRegisterApp } from "./global"

import "normalize.css" // 引入重置样式表
import "./assets/css/index.less" // 引入自定义样式
import "element-plus/dist/index.css" // 全局引入Element Plus样式

// import westRequest from "./service" // 引入封装好的网络请求模块

import App from "./App.vue"

createApp(App)
  .use(globalRegisterApp) // 全局按需注册Icon/其他
  .use(store)
  .use(setupStore) // 调用解决刷新使vuex中保存的数据消失的回调
  .use(router)
  .mount("#app")

// 学习 .env 获取当前环境，使用符合当前环境的配置
// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)
