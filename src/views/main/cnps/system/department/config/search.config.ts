import type { IWestForm } from "../type/types"

export const searchFormConfig: IWestForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "部门名称",
      placeholder: "请输入部门名称",
      rules: []
    },
    {
      field: "leader",
      type: "input",
      label: "部门领导",
      placeholder: "请输入部门领导",
      rules: []
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      rules: [],
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }
  ],
  labelWidth: "120px",
  itemStyle: { padding: "10px 40px" }
}
