const chat = (): Promise<typeof import("*.vue")> =>
  import("@/views/main/cnps/story/chat/chat.vue")

export default {
  path: "/main/cnps/story/chat",
  name: "chat",
  component: chat,
  children: []
}
