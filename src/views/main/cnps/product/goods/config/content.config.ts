import type { ITableConfigType } from "../type/types"

export const contentTableConfig: ITableConfigType = {
  title: "商品列表",
  headerTitle: "创建商品",
  propList: [
    { prop: "name", label: "商品名称", minWidth: "80" },
    { prop: "oldPrice", label: "原价格", minWidth: "80", slotName: "oldPrice" },
    { prop: "newPrice", label: "现价格", minWidth: "80", slotName: "newPrice" },
    { prop: "desc", label: "商品描述", minWidth: "80" },
    { prop: "imgUrl", label: "商品图片", minWidth: "100", slotName: "image" },
    { prop: "inventoryCount", label: "库存", minWidth: "80" },
    { prop: "saleCount", label: "销量", minWidth: "80" },
    { prop: "favorCount", label: "收藏", minWidth: "80" },
    { prop: "address", label: "地址", minWidth: "80" },
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
      slotName: "handler",
      fixed: "right"
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  height: "427px"
}
