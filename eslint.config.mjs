import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),
  {
    files: ['**/.eslintrc.{js,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'commonjs',
    }
  },
  {
    ignores: ['node_module/*', 'build/*', '**/tsconfig.json', 'scripts/*'],
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    rules: {
      indent: ['error', 2, {
        SwitchCase: 1,
      }],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'linebreak-style': ['error', 'unix'],
      'eol-last': ['error', 'always'],
      'no-warning-comments': ['warn', {
        terms: ['TODO', 'FIX'],
        location: 'start',
      }],
      '@typescript-eslint/no-unused-vars': ['error', {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
    }
  }
]
