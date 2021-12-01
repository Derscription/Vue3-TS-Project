import type { App } from "vue"

import {
  Apple,
  User,
  Iphone,
  Fold,
  Expand,
  ArrowDown,
  CircleClose,
  Search,
  Refresh,
  Warning
} from "@element-plus/icons"

const icons = [
  Apple,
  User,
  Iphone,
  Fold,
  Expand,
  ArrowDown,
  CircleClose,
  Search,
  Refresh,
  Warning
]

export default function registerIcon(app: App): void {
  icons.forEach((icon) => {
    app.component(icon.name, icon)
  })
}
