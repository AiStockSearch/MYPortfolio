import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const previewPort = Number(process.env.PORT) || 4173;

export default defineConfig({
  assetsInclude: ["**/*.yaml"],
  server: {
    warmup: {
      clientFiles: [path.resolve(__dirname, "./src/main.tsx")],
    },
  },
  preview: {
    // Render Web Service: слушать 0.0.0.0 и порт из $PORT (по умолчанию у Render — 10000)
    host: true,
    port: previewPort,
    strictPort: true,
  },
  plugins: [
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
    lingui(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
