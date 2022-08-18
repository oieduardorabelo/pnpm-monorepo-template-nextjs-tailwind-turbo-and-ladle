const eslintBaseConfig = require('@monorepo/eslint/eslint.base');

module.exports = {
  ...eslintBaseConfig,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  extends: [...eslintBaseConfig.extends, 'next/core-web-vitals'],
};
