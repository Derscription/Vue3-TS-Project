// 编写表单验证规则
const rules = {
  num: [
    { required: true, message: "手机号不得为空", trigger: "blur" },
    {
      pattern: /^[0-9]{0,11}$/,
      message: "手机号位数不对"
    }
  ],
  verifyCode: [
    { required: true, message: "验证码不得为空", trigger: "blur" },
    {
      pattern: /^[0-9]{0,6}$/,
      message: "请输入6位验证码"
    }
  ]
}

export default rules
