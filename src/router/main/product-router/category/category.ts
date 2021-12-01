const category = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/cnps/product/category/category.vue")

export default {
  path: "/main/cnps/product/category",
  name: "category",
  component: category,
  children: []
}
