const user = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/cnps/system/user/user.vue")

export default {
  path: "/main/cnps/system/user",
  name: "user",
  component: user,
  children: []
}
