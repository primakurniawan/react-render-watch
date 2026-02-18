# react-render-watch

Lightweight render debugging widget for React.

Track component renders and function calls visually during development.

![Recording 2026-02-18 065116](https://github.com/user-attachments/assets/e517f8f1-5e90-4fea-9eec-aabe57b58ea3)

## Install

npm install react-render-watch

## Usage

```tsx
import { useState } from "react"
import { useRenderWatch, mountDevtools } from "react-render-watch"

mountDevtools()

function App() {
  const [count, setCount] = useState(0)

  const { track } = useRenderWatch({
    name: "Counter",
    watch: { count }
  })

  const handleClick = track("increment", () => {
    setCount(c => c + 1)
  })

  return (
    <button onClick={handleClick}>
      {count}
    </button>
  )
}

export default App
