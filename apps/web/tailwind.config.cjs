const tailwindBaseConfig = require('@monorepo/tailwind/tailwindconfig.base');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindBaseConfig],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
