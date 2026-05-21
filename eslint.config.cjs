const reactPlugin = require('eslint-plugin-react');
const tsParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = [
  {
    ignores: [
      'build/**',
      'coverage/**',
      'dist/**',
      'node_modules/**',
      'public/customJs/**',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...prettierConfig.rules,
      'prefer-const': 'error',
      'no-undef': 'off',
      'no-use-before-define': 'off',
      'react/prop-types': 'off',
    },
  },
];
