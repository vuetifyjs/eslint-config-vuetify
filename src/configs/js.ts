import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'

import eslint from '@eslint/js'

import globals from 'globals'
import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'

export function js (options: Options['js'] = true): TypedFlatConfigItem[] {
  const files = (typeof options === 'boolean')
    ? [
      GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX,
    ]
    : options.files

  return [
    {
      files,
      ...eslint.configs.recommended,
      name: 'vuetify/js/recommended',
    },
    {
      files,
      name: 'vuetify/js',
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.es2021,
          ...globals.browser,
        },
        parserOptions: {
          ecmaFeatures: { jsx: true },
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      rules: {
        'complexity': ['error', 32],
        'curly': ['error', 'all'],
        'no-case-declarations': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-empty': 'error',
        'no-prototype-builtins': 'off',
        'no-return-assign': 'off',
        'no-unused-vars': 'error',
        'no-var': 'error',
        'no-void': 'off',
        'object-shorthand': ['error', 'always'],
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],
      },
    },
  ]
}
