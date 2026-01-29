import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite"; // Add this
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Initialize Tailwind here
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
