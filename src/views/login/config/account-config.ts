// 编写表单验证规则
const rules = {
  name: [
    { required: true, message: "账号不得为空", trigger: "blur" },
    {
      pattern: /^[A-Za-z0-9]{5,10}$/,
      message: "账号必须是5-10个字母或者数字"
    }
  ],
  password: [
    { required: true, message: "密码不得为空", trigger: "blur" },
    {
      pattern: /^[A-Za-z0-9]{6,}$/,
      message: "密码不得少于6位"
    }
  ]
}

export default rules
