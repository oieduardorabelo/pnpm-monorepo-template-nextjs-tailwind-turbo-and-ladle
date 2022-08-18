/**
 * This ESLint file configuration is shared across ALL `/app/*` and `/packages/*`
 * You don't need to define per project ESLint configuration
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'next/core-web-vitals',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.workspace.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
  },
  rules: {
    // https://nextjs.org/docs/messages/no-html-link-for-pages
    '@next/next/no-html-link-for-pages': ['error', 'apps/web/src/pages'],

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
  ],
};
