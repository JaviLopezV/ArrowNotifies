import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/ArrowNotifies/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Arrow Notifies",
        short_name: "ArrowNotifies",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/arrow.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/arrow.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    host: true, // Permite acceder desde otras IPs
    port: 5173, // Cambia el puerto si lo necesitas
    allowedHosts: [
      "7c8a-90-162-67-34.ngrok-free.app", // Agrega aquí el dominio de ngrok
    ],
  },
});
