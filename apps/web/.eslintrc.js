const eslintBaseConfig = require('@monorepo/eslint/eslint.base');

module.exports = {
  ...eslintBaseConfig,
  extends: [...eslintBaseConfig.extends, 'next/core-web-vitals'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
};
