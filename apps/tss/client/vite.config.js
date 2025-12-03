import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");

  return {
    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "src/assets"),
      },
    },

    server: {
      port: 4001,
      strictPort: true,
      open: true,

      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
          secure: false,

          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },

    build: {
      outDir: "dist",
      sourcemap: true,
    },
  };
});
