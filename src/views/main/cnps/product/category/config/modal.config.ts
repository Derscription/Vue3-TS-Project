import type { IWestForm } from "../type/types"

export const modalConfig: IWestForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      placeholder: "请输入角色名称"
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
