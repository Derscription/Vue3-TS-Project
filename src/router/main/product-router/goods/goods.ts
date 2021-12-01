const goods = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/cnps/product/goods/goods.vue")

export default {
  path: "/main/cnps/product/goods",
  name: "goods",
  component: goods,
  children: []
}
