const eslintBaseConfig = require('@monorepo/eslint/eslint.base');

module.exports = {
  ...eslintBaseConfig,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    ...eslintBaseConfig.rules,
    '@next/next/no-html-link-for-pages': ['error', 'apps/web/src/pages/'],
  },
};
