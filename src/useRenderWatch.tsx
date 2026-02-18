import { useEffect } from "react"
import { registerComponent, trackAction } from "./store"

type Options = {
  name: string
  watch: Record<string, any>
}

export function useRenderWatch({ name, watch }: Options) {
  useEffect(() => {
    registerComponent(name, watch)
  })

  function track<T extends (...args: any[]) => any>(
    actionName: string,
    fn: T
  ): T {
    return ((...args: any[]) => {
      trackAction(name, actionName)
      return fn(...args)
    }) as T
  }

  return { track }
}
