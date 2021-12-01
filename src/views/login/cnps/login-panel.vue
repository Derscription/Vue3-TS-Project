<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- 用户登录选项 -->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <!-- 标签栏 -->
        <template #label>
          <span>
            <el-icon><user /></el-icon>
            账号登录
          </span>
        </template>
        <!-- 内容 -->
        <LoginAccount ref="LoginAccountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <!-- 标签栏 -->
        <template #label>
          <span>
            <el-icon><iphone /></el-icon>
            手机号登录
          </span>
        </template>
        <!-- 内容 -->
        <LoginPhone ref="LoginPhoneRef" />
      </el-tab-pane>
    </el-tabs>

    <template v-if="currentTab === 'account'">
      <!-- 登录的辅助功能 -->
      <div class="account-content">
        <el-checkbox class="keep-password" v-model="isKeepPassword">
          记住密码
        </el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
    </template>

    <!-- 登录按钮 -->
    <el-button class="login-button" type="primary" @click="handleClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import LoginAccount from "./login-account.vue"
import LoginPhone from "./login-phone.vue"
import localCache from "@/utils/cache"

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(false)
    const LoginAccountRef = ref<InstanceType<typeof LoginAccount>>()
    const LoginPhoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref("account")

    // 判断之前是否保存密码
    if (localCache.getCache("password")) {
      isKeepPassword.value = true
    }

    // 2.定义方法
    const handleClick = () => {
      // 判断是账号登录还是手机号登录
      if (currentTab.value === "account") {
        LoginAccountRef.value?.loginAction(isKeepPassword.value)
      } else {
        LoginPhoneRef.value?.loginAction()
      }
    }

    return {
      isKeepPassword,
      LoginAccountRef,
      LoginPhoneRef,
      currentTab,
      handleClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 340px;

  .title {
    text-align: center;
  }

  .account-content {
    margin: 13px 0 5px 0;
    display: flex;
    justify-content: space-between;

    .keep-password {
      height: 100% !important;
    }
  }

  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
