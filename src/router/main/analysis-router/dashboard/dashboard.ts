const dashboard = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/cnps/analysis/dashboard/dashboard.vue")

export default {
  path: "/main/cnps/analysis/dashboard",
  name: "dashboard",
  component: dashboard,
  children: []
}
