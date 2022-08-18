/**
 * This Prettier configuration file is shared across ALL `/app/*` and `/packages/*`
 * You don't need to define per project Prettier configuration
 */
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'es5',
};
