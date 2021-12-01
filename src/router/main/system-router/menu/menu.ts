const menu = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/cnps/system/menu/menu.vue")

export default {
  path: "/main/cnps/system/menu",
  name: "menu",
  component: menu,
  children: []
}
