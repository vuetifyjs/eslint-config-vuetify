import type { Options } from '../schema'

import type { TypedFlatConfigItem } from '../types'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import { interopDefault } from '../utils'
import { jsoncParser } from '../vendors'

export async function jsonc (
  options: Options['json'],
  stylistic: Options['stylistic'],
): Promise<TypedFlatConfigItem[]> {
  const files = (typeof options === 'boolean') ? [GLOB_JSON, GLOB_JSONC, GLOB_JSON5] : options?.files ?? [GLOB_JSON, GLOB_JSONC]

  const jsoncPlugin = await interopDefault(import('eslint-plugin-jsonc'))

  return [
    {
      name: 'vuetify/jsonc/setup',
      plugins: {
        jsonc: jsoncPlugin,
      },
    },
    {
      files,
      languageOptions: {
        parser: jsoncParser,
      },
      name: 'vuetify/jsonc/rules',
      rules: {
        'jsonc/no-bigint-literals': 'error',
        'jsonc/no-binary-expression': 'error',
        'jsonc/no-binary-numeric-literals': 'error',
        'jsonc/no-dupe-keys': 'error',
        'jsonc/no-escape-sequence-in-identifier': 'error',
        'jsonc/no-floating-decimal': 'error',
        'jsonc/no-hexadecimal-numeric-literals': 'error',
        'jsonc/no-infinity': 'error',
        'jsonc/no-multi-str': 'error',
        'jsonc/no-nan': 'error',
        'jsonc/no-number-props': 'error',
        'jsonc/no-numeric-separators': 'error',
        'jsonc/no-octal': 'error',
        'jsonc/no-octal-escape': 'error',
        'jsonc/no-octal-numeric-literals': 'error',
        'jsonc/no-parenthesized': 'error',
        'jsonc/no-plus-sign': 'error',
        'jsonc/no-regexp-literals': 'error',
        'jsonc/no-sparse-arrays': 'error',
        'jsonc/no-template-literals': 'error',
        'jsonc/no-undefined-value': 'error',
        'jsonc/no-unicode-codepoint-escapes': 'error',
        'jsonc/no-useless-escape': 'error',
        'jsonc/space-unary-ops': 'error',
        'jsonc/valid-json-number': 'error',
        'jsonc/vue-custom-block/no-parsing-error': 'error',

        ...stylistic
          ? {
              'jsonc/array-bracket-spacing': ['error', 'never'],
              'jsonc/comma-dangle': ['error', 'never'],
              'jsonc/comma-style': ['error', 'last'],
              'jsonc/indent': ['error', 2],
              'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
              'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],
              'jsonc/object-curly-spacing': ['error', 'always'],
              'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
              'jsonc/quote-props': 'error',
              'jsonc/quotes': 'error',
            }
          : {},
      },
    },
  ]
}
