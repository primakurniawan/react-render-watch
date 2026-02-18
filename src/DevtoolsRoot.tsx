import React, {
  useSyncExternalStore,
  useState,
  useRef,
  useEffect
} from "react"
import { subscribe, getState } from "./store"

export function DevtoolsRoot() {
  const state = useSyncExternalStore(
    subscribe,
    getState,
    getState
  )

  const [collapsed, setCollapsed] = useState(false)
  const [size, setSize] = useState({ width: 320, height: 260 })
  const [position, setPosition] = useState({ x: 20, y: 20 })

  const dragging = useRef(false)
  const resizing = useRef(false)

  function onMouseDownDrag(e: React.MouseEvent) {
    dragging.current = true
    e.preventDefault()
  }

  function onMouseDownResize(e: React.MouseEvent) {
    resizing.current = true
    e.preventDefault()
  }

  function onMouseMove(e: MouseEvent) {
    if (dragging.current) {
      setPosition(prev => ({
        x: Math.max(0, prev.x + e.movementX),
        y: Math.max(0, prev.y + e.movementY)
      }))
    }

    if (resizing.current) {
      setSize(prev => ({
        width: Math.max(240, prev.width + e.movementX),
        height: Math.max(140, prev.height + e.movementY)
      }))
    }
  }

  function onMouseUp() {
    dragging.current = false
    resizing.current = false
  }

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: size.width,
        height: collapsed ? 42 : size.height,
        background: "#111",
        color: "#00ff88",
        fontSize: 12,
        fontFamily: "monospace",
        borderRadius: 10,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
      }}
    >
      {/* Header */}
      <div
        onMouseDown={onMouseDownDrag}
        style={{
          background: "#1b1b1b",
          padding: "8px 12px",
          cursor: "move",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          userSelect: "none"
        }}
      >
        <strong>Render Watch</strong>

        <button
          onClick={() => setCollapsed(c => !c)}
          style={{
            background: "none",
            border: "none",
            color: "#00ff88",
            cursor: "pointer",
            fontSize: 14
          }}
        >
          {collapsed ? "▲" : "▼"}
        </button>
      </div>

      {/* Body */}
      {!collapsed && (
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: 12
          }}
        >
          {state.length === 0 && (
            <div style={{ opacity: 0.5 }}>
              No components tracked yet...
            </div>
          )}

          {state.map(item => (
            <div
              key={item.id}
              style={{
                marginBottom: 12,
                padding: 8,
                border: "1px solid #222",
                borderRadius: 6,
                background: "#181818"
              }}
            >
              <div>
                <strong>{item.name}</strong>
              </div>

              <div>Renders: {item.renders}</div>

              <div>
                Watch: {JSON.stringify(item.lastWatch)}
              </div>

              {item.lastAction && (
                <div>
                  Last Action: {item.lastAction}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Resize Handle */}
      {!collapsed && (
        <div
          onMouseDown={onMouseDownResize}
          style={{
            height: 10,
            cursor: "nwse-resize",
            background: "#1b1b1b"
          }}
        />
      )}
    </div>
  )
}
