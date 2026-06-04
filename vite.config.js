import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import jsconfigPaths from 'vite-jsconfig-paths';
import tailwindcss from '@tailwindcss/vite'
import analyzer from "vite-bundle-analyzer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), jsconfigPaths(), analyzer()],
});
