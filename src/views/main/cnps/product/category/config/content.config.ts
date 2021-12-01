import type { ITableConfigType } from "../type/types"

export const contentTableConfig: ITableConfigType = {
  title: "类别列表",
  headerTitle: "创建类别",
  propList: [
    { prop: "name", label: "角色名称", minWidth: "120" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "250",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "250",
      slotName: "updateAt"
    },
    { label: "操作", minWidth: "120", slotName: "handler" }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
