import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import jest from 'eslint-plugin-jest';
import eslintRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  eslintRecommended,
  globalIgnores(['./dist/*.js']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ['error', 'always'],
      'no-useless-escape': ['error', { allowRegexCharacters: ['-'] }],
    },
  },
  {
    files: ['src/**/*.test.js'],
    ...jest.configs['flat/recommended'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);
