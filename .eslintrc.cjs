/**
 * This ESLint file configuration is shared across ALL `/app/*` and `/packages/*`
 * You don't need to install or define per project ESLint configuration
 * Use the "overrides" key to apply per project configurtion
 * Install all ESLint plugins in the top-level package.json (pnpm add -D <name> -w)
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.workspace.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
  },
  rules: {
    // TypeScript specific rules are disabled by default
    // And enabled in "overrides" for TypeScript files only
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',

    // https://typescript-eslint.io/rules/no-unused-vars/
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
      },
    },
    {
      files: ['./apps/web/**/*'],
      extends: ['next/core-web-vitals'],
      rules: {
        // https://nextjs.org/docs/messages/no-html-link-for-pages
        '@next/next/no-html-link-for-pages': ['error', './src/pages'],
      },
    },
  ],
};
