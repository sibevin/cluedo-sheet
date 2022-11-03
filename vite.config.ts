import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "Cluedo Sheet",
        short_name: "Cluedo",
        description:
          "An interactive detective sheet for Cluedo / Clue board game",
        icons: [
          {
            src: "/pwa/logo-512x512.png",
            types: "img/png",
            sizes: "512x512",
          },
          {
            src: "/pwa/logo-256x256.png",
            types: "img/png",
            sizes: "256x256",
          },
          {
            src: "/pwa/logo-192x192.png",
            types: "img/png",
            sizes: "192x192",
          },
          {
            src: "/pwa/logo-180x180.png",
            types: "img/png",
            sizes: "180x180",
          },
          {
            src: "/pwa/logo-144x144.png",
            types: "img/png",
            sizes: "144x144",
          },
          {
            src: "/pwa/logo-128x128.png",
            types: "img/png",
            sizes: "128x128",
          },
          {
            src: "/pwa/logo-120x120.png",
            types: "img/png",
            sizes: "120x120",
          },
          {
            src: "/pwa/logo-96x96.png",
            types: "img/png",
            sizes: "96x96",
          },
          {
            src: "/pwa/logo-72x72.png",
            types: "img/png",
            sizes: "72x72",
          },
          {
            src: "/pwa/logo-64x64.png",
            types: "img/png",
            sizes: "64x64",
          },
          {
            src: "/pwa/logo-48x48.png",
            types: "img/png",
            sizes: "48x48",
          },
          {
            src: "/pwa/logo-32x32.png",
            types: "img/png",
            sizes: "32x32",
          },
        ],
        display: "fullscreen",
        background_color: "#ffffff",
        theme_color: "#ffffff",
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/cluedo-sheet/",
});
