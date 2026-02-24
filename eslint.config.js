import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import node from 'eslint-plugin-n';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'lib/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      unicorn,
      node,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'node/no-missing-import': 'off',
      'unicorn/better-regex': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-hex-escape': 'off',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-zero-fractions': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prefer-json-parse-buffer': 'off',
      'unicorn/prefer-node-protocol': 'off',
      camelcase: 'off', // Camel case fields are used in CKL
      complexity: 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      'keyword-spacing': 2,
      'max-nested-callbacks': 'off',
      'no-await-in-loop': 'off',
      'no-console': 'off',
      'no-control-regex': 'off',
      'no-process-exit': 'off',
      'no-constant-condition': 'off',
      'object-curly-spacing': [2, 'never'],
      'space-before-blocks': 'warn',
      'space-in-parens': 2,
      quotes: [2, 'single', { avoidEscape: true }],
    },
  },
]);

