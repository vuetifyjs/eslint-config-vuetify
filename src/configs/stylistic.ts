import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'
import { GLOB_VUE } from '../globs'
import { interopDefault } from '../utils'

export async function stylistic (options: Options['stylistic'] = true): Promise<TypedFlatConfigItem[]> {
  if (!options) {
    return []
  }
  return [
    {
      name: 'vuetify/stylistic',
      plugins: { '@stylistic': await interopDefault(import('@stylistic/eslint-plugin')) },
      rules: {
        '@stylistic/indent': ['error', 2],
        '@stylistic/array-bracket-spacing': ['error', 'never'],
        '@stylistic/arrow-parens': ['error', 'as-needed'],
        '@stylistic/brace-style': ['error', '1tbs'],
        '@stylistic/comma-dangle': [
          'error',
          {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'only-multiline',
          },
        ],
        '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true, allowMultiplePropertiesPerLine: false }],
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/object-curly-newline': ['error', { consistent: true, multiline: true }],
        '@stylistic/dot-location': ['error', 'property'],
        '@stylistic/eol-last': ['error', 'always'],
        '@stylistic/no-extra-semi': 'error',
        '@stylistic/no-multiple-empty-lines': [
          'error',
          {
            max: 2, maxEOF: 0, maxBOF: 0,
          },
        ],
        '@stylistic/no-multi-spaces': 'error',
        '@stylistic/multiline-ternary': ['error', 'always-multiline'],
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/quotes': [
          'error',
          'single',
          {
            allowTemplateLiterals: true,
            avoidEscape: true,
          },
        ],
        '@stylistic/quote-props': ['error', 'consistent-as-needed'],
        '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
        '@stylistic/space-before-function-paren': [
          'error',
          {
            anonymous: 'always',
            asyncArrow: 'always',
            named: 'always',
          },
        ],
        '@stylistic/operator-linebreak': ['error', 'before'],
        '@stylistic/array-element-newline': ['error', { multiline: true }],
        '@stylistic/key-spacing': [
          'error',
          {
            beforeColon: false,
            afterColon: true,
            mode: 'strict',
          },
        ],
        '@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
        '@stylistic/array-bracket-newline': ['error', { multiline: true, minItems: 4 }],
      },
    },
    {
      files: [GLOB_VUE],
      name: 'vuetify/stylistic/vue',
      rules: { '@stylistic/indent': 'off' },
    },
  ]
}
