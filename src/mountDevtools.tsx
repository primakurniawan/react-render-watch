import { createRoot } from "react-dom/client"
import { DevtoolsRoot } from "./DevtoolsRoot"

let mounted = false

export function mountDevtools() {
  if (mounted) return
  mounted = true

  if (typeof window === "undefined") return

  const existing = document.getElementById(
    "__RENDER_WATCH_DEVTOOLS__"
  )

  if (existing) return

  const container = document.createElement("div")
  container.id = "__RENDER_WATCH_DEVTOOLS__"
  document.body.appendChild(container)

  const root = createRoot(container)
  root.render(<DevtoolsRoot />)
}
