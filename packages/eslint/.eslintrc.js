const eslintBaseConfig = require('./eslint.base');

module.exports = {
  ...eslintBaseConfig,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
};
