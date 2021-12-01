const list = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/cnps/story/list/list.vue")

export default {
  path: "/main/cnps/story/list",
  name: "list",
  component: list,
  children: []
}
