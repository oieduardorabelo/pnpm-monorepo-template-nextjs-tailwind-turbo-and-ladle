const eslintBaseConfig = require('@monorepo/eslint/eslint.base');

module.exports = {
  ...eslintBaseConfig,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
