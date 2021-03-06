import type { ITableConfigType } from "../type/types"

export const contentTableConfig: ITableConfigType = {
  title: "角色列表",
  headerTitle: "创建角色",
  propList: [
    { prop: "name", label: "角色名", minWidth: "100" },
    { prop: "intro", label: "权限介绍", minWidth: "100" },
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
    {
      label: "操作",
      minWidth: "190",
      slotName: "handler"
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  height: "427px"
}
