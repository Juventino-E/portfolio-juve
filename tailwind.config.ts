import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
