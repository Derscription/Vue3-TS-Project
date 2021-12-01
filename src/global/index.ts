import type { App } from "vue"

import registerIcon from "./register_icon"
import registerProperties from "./register_properties"

export function globalRegisterApp(app: App): void {
  registerIcon(app)
  registerProperties(app)
}
