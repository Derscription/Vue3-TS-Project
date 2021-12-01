import type { IWestForm } from "../type/types"

export const searchFormConfig: IWestForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "类别名称",
      placeholder: "请输入类别名称",
      rules: []
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }
  ],
  labelWidth: "120px",
  itemStyle: {
    padding: "20px 40px"
  }
}
