import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  compilerOptions: {
    preserveComments: true,
  },
  kit: {
    adapter: adapter({
			fallback: 'index.html',
    }),
    paths: {
      base: '/toolkit'
    },
    alias: {
      '$components': 'src/lib/components',
      '$modules': 'src/lib/modules',
      '$utils': 'src/lib/utils',
    }
  }
};

export default config;
