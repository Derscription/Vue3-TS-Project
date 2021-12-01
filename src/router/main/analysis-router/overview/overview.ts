const overview = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/cnps/analysis/overview/overview.vue")

export default {
  path: "/main/cnps/analysis/overview",
  name: "overview",
  component: overview,
  children: []
}
