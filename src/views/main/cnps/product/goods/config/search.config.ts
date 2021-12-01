import type { IWestForm } from "../type/types"

export const searchFormConfig: IWestForm = {
  labelWidth: "120px",
  itemStyle: {
    padding: "20px 40px"
  },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "商品名称",
      placeholder: "请输入商品名称"
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      placeholder: "请选择创建时间范围",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }
  ]
}
