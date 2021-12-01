import type {
  IUserMenusType,
  RouteRecordRaw,
  currentUserMenusType,
  matchingMenuType,
  IWestBreadcrumbType
} from "./types"

// 保存第一个路由对象
let firstMenu: matchingMenuType

// Menus 转 路由对象
export function mapMenusToRoutes(
  userMenus: IUserMenusType[]
): RouteRecordRaw[] {
  // 需要添加的动态路由
  const routes: RouteRecordRaw[] = []

  // 1.先去加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // 获取所有文件信息对象 (webpack内部方法)
  const routeFiles = require.context("../router/main", true, /\.ts$/)
  // 获取所有文件的路径信息，并遍历这个路径信息
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  /**
   * * userMenus:
   * * type === 1 -> children -> type === 1 -> children
   * * type === 2 -> url -> route
   */

  const _recurseGetRoute = (menus: currentUserMenusType) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 匹配路由是否相同
        const route = allRoutes.find((item) => {
          const route = item.path.replace(/\/cnps/, "")
          return route === menu.url
        })
        if (route) routes.push(route)
        // 判断是否存在第一个路由对象
        if (!firstMenu) firstMenu = menu
      } else {
        _recurseGetRoute(menu.children ?? [])
      }
    }
  }
  _recurseGetRoute(userMenus)

  // 处理所有文件的路径信息中与服务器返回路径信息有差异的部分
  routes.map((route) => {
    route.path = route.path.replace(/\/cnps/, "")
  })

  return routes
}

// 根据当前浏览器地址栏中的url，查找并记录页面嵌套的层次
export function pathMapBreadcrumbs(
  userMenus: currentUserMenusType,
  currentPath: string
): IWestBreadcrumbType[] {
  const breadcrumbs: IWestBreadcrumbType[] = []

  _recursePathMapToMenu(userMenus, currentPath, breadcrumbs)

  return breadcrumbs
}

// 根据当前浏览器地址栏中的url，去查找对应的Menu对象
export function _recursePathMapToMenu(
  userMenus: currentUserMenusType,
  currentPath: string,
  breadcrumbs?: IWestBreadcrumbType[]
): matchingMenuType | undefined {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = _recursePathMapToMenu(
        menu.children ?? [],
        currentPath,
        breadcrumbs
      )
      if (findMenu) {
        breadcrumbs?.unshift({ name: menu.name, path: menu.url })
        // breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      breadcrumbs?.push({ name: menu.name, path: menu.url })
      return menu
    }
  }
}

// 获取当前用户菜单的权限类型
export function mapMenusToPermissions(userMenus: any[]): string[] {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)

  return permissions
}

// 获取当前选项的叶子节点
export function menuMapLeafKeys(menuList: currentUserMenusType): number[] {
  const leftKeys: number[] = []

  const _recurseGetLeaf = (menuList: currentUserMenusType) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }

  _recurseGetLeaf(menuList)

  return leftKeys
}

export { firstMenu }
