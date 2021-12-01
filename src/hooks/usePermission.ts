import { useStore } from "@/store"

export function usePermission(pageName: string, handleName: string): boolean {
  const store = useStore()
  const permissions = store.state.login.permission
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item.indexOf(verifyPermission))
}
