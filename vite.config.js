import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/self_vue3_hash/' : '/',
  plugins: [
    vue(),
    qiankun("app-vue3", {
      useDevMode: true,
    }),
  ],

  server: {
    origin:"http://localhost:8083", // 本地开发时，指定origin。否则在主应用中访问子应用中的图片等静态资源时会404，原因：vite在development环境不支持publicPath,会导致子应用的静态资源文件直接去主应用服务下拿。
    port: 8083,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
