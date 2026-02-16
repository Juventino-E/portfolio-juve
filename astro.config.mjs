import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: "server",
  adapter: vercel(),
  
  security: {
    checkOrigin: false
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