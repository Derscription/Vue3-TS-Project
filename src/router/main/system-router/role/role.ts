const role = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/cnps/system/role/role.vue")

export default {
  path: "/main/cnps/system/role",
  name: "role",
  component: role,
  children: []
}
