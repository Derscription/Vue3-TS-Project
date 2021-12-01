import type { ITableConfigType } from "../type/types"

export const contentTableConfig: ITableConfigType = {
  title: "部门列表",
  headerTitle: "创建部门",
  propList: [
    { prop: "name", label: "部门名称", minWidth: "100" },
    { prop: "leader", label: "部门领导", minWidth: "100" },
    { prop: "parentId", label: "上级部门", minWidth: "100" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "200",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "200",
      slotName: "updateAt"
    },
    { label: "操作", minWidth: "190", slotName: "handler" }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  height: "427px"
}
