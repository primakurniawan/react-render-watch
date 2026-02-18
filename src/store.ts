type Listener = () => void

type Entry = {
  id: number
  name: string
  renders: number
  lastWatch: Record<string, any>
  lastAction?: string
}

let state: Entry[] = []
let idCounter = 0

const listeners = new Set<Listener>()

export function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getState() {
  return state
}

export function registerComponent(name: string, watch: Record<string, any>) {
  const existingIndex = state.findIndex(e => e.name === name)

  if (existingIndex !== -1) {
    const existing = state[existingIndex]

    const updated = {
      ...existing,
      renders: existing.renders + 1,
      lastWatch: watch
    }

    state = [
      ...state.slice(0, existingIndex),
      updated,
      ...state.slice(existingIndex + 1)
    ]
  } else {
    state = [
      ...state,
      {
        id: idCounter++,
        name,
        renders: 1,
        lastWatch: watch
      }
    ]
  }

  listeners.forEach(l => l())
}

export function trackAction(name: string, action: string) {
  const index = state.findIndex(e => e.name === name)
  if (index === -1) return

  const updated = {
    ...state[index],
    lastAction: action
  }

  state = [
    ...state.slice(0, index),
    updated,
    ...state.slice(index + 1)
  ]

  listeners.forEach(l => l())
}

