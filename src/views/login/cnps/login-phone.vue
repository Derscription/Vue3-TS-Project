<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input placeholder="请输入手机号" v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div class="get-code">
          <el-input
            class="get-btn"
            placeholder="请输入验证码"
            v-model="phone.verifyCode"
          ></el-input>
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import rules from "../config/phone-config" // 引入表单验证规则
import { ElMessage } from "element-plus"

export default defineComponent({
  setup() {
    const phone = reactive({
      num: "",
      verifyCode: ""
    })

    const loginAction = () => {
      ElMessage({
        message: "手机号登录功能暂未开放~",
        type: "warning",
        showClose: true,
        duration: 1550
      })
    }

    return {
      phone,
      rules,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
}

.get-btn {
  padding-right: 8px;
}
</style>
