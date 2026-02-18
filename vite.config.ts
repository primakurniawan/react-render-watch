import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ReactRenderWatch",
      formats: ["es"],
      fileName: () => "index.js"
    },
    rollupOptions: {
      external: ["react", "react-dom"]
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ]
})
