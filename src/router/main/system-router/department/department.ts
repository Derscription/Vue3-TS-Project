const department = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/cnps/system/department/department.vue")

export default {
  path: "/main/cnps/system/department",
  name: "department",
  component: department,
  children: []
}
