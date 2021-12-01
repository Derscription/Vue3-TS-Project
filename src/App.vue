<template>
  <!-- 国际化处理 -->
  <el-config-provider :locale="locale">
    <div class="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { ElConfigProvider } from "element-plus"

// 引入中文
import zhCn from "element-plus/lib/locale/lang/zh-cn"

// defineComponent 用来对类型进行一些限制和推导
export default defineComponent({
  name: "App",
  setup() {
    return {
      locale: zhCn
    }
  },
  components: {
    ElConfigProvider
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
