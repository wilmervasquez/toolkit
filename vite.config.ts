import tailwindcss from "@tailwindcss/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  plugins: [
    tailwindcss(),
    enhancedImages(),
    sveltekit(),
    qrcode(),
    devtoolsJson(),
  ],
  server: { watch: { ignored: ["**/.temp/**"] } },
});
