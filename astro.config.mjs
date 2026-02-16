import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  output: "server",
  adapter: vercel(),

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  site: process.env.SITE_URL || 'http://localhost:4321',
  trailingSlash: 'never',

  build: {
    inlineStylesheets: 'auto'
  },

  integrations: [react()]
});