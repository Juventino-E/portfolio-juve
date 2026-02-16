import vercel from '@astrojs/vercel/serverless'; 
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  output: "server",
  adapter: vercel(),

    vite: {
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  },

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  site: 'https://portfolio-juve.vercel.app',
  trailingSlash: 'never',

  build: {
    inlineStylesheets: 'auto'
  },

  integrations: [react()]
});