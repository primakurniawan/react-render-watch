import { useState } from "react"

type Props = {
  id: string
  name: string
  renders: number
  changes: Record<string, number>
  fnCalls: Record<string, number>
}

export function RenderWatchWidget({
  name,
  renders,
  changes,
  fnCalls
}: Props) {
  const [pos, setPos] = useState({ x: 20, y: 20 })

  return (
    <div
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        background: "#111",
        color: "#0f0",
        padding: 12,
        fontSize: 12,
        borderRadius: 8,
        zIndex: 999999,
        cursor: "move"
      }}
      draggable
      onDragEnd={e =>
        setPos({ x: e.clientX, y: e.clientY })
      }
    >
      <div><strong>{name}</strong></div>
      <div>Renders: {renders}</div>

      <div>
        <strong>Watched:</strong>
        {Object.entries(changes).map(([k, v]) => (
          <div key={k}>{k}: {v}</div>
        ))}
      </div>

      <div>
        <strong>Functions:</strong>
        {Object.entries(fnCalls).map(([k, v]) => (
          <div key={k}>{k}: {v}</div>
        ))}
      </div>
    </div>
  )
}
