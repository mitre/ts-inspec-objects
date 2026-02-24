import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import node from 'eslint-plugin-n';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'lib/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.customize({
    braceStyle: '1tbs',
    indent: [2, { SwitchCase: 1 }],
    semi: true,
    quoteProps: 'as-needed',
    quotes: 'single',
  }),
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
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'n/no-missing-import': 'off',
      'n/no-process-exit': 'off',
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
      'max-nested-callbacks': 'off',
      'no-await-in-loop': 'off',
      'no-console': 'off',
      'no-control-regex': 'off',
      'no-constant-condition': 'off',
    },
  },
]);

