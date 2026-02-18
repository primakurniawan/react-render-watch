export function createTrackedFn(
  label: string,
  fn: Function,
  setFnCalls: any
) {
  return (...args: any[]) => {
    setFnCalls((prev: any) => ({
      ...prev,
      [label]: (prev[label] || 0) + 1
    }))

    return fn(...args)
  }
}
