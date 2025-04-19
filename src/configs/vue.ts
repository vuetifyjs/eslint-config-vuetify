import type { ESLint } from 'eslint'

import type { Options, TsPresets } from '../schema'
import type { TypedFlatConfigItem } from '../types'

import { GLOB_JSX, GLOB_TSX, GLOB_VUE } from '../globs'
import { assertPackage, interopDefault } from '../utils'
import { tseslintVendor, vueParser, vueVendor } from '../vendors'
import { typescriptCore } from './ts'

const vueTs = (preset: TsPresets) => typescriptCore(preset)
  .filter(config => config.name !== 'typescript-eslint/base')
  .map(config => {
    return {
      ...config,
      files: [GLOB_VUE],
      name: `vuetify/vue/${config.name?.replace('vuetify/', '') || 'anonymous'}`,
    }
  }) as TypedFlatConfigItem[]

const recommendedRules = vueVendor.configs['flat/recommended']
  .map(c => c.rules)
  .reduce((acc, c) => ({ ...acc, ...c }), {}) as any

const rules = {
  ...recommendedRules,
  'vue/html-closing-bracket-newline': [
    'error',
    {
      singleline: 'never',
      multiline: 'always',
    },
  ],
  'vue/html-closing-bracket-spacing': 'error',
  'vue/max-attributes-per-line': [
    'error',
    {
      singleline: 4,
      multiline: 1,
    },
  ],
  'vue/multi-word-component-names': 'off',
  'vue/multiline-html-element-content-newline': 'off',
  'vue/no-v-html': 'off',
  'vue/script-indent': [
    'error',
    2,
    {
      baseIndent: 1,
      switchCase: 1,
      ignores: [],
    },
  ],
  'vue/singleline-html-element-content-newline': 'off',
  'vue/valid-v-on': 'off',
  'vue/valid-v-slot': ['error', { allowModifiers: true }],
}

export async function vue (options: Options['vue'] = true, tsOptions: Options['ts'] = true): Promise<TypedFlatConfigItem[]> {
  const plugins = { vue: vueVendor } as Record<string, ESLint.Plugin>

  const tsEnabled = !!tsOptions
  const tsPreset = (typeof tsOptions === 'boolean') ? 'recommended' : tsOptions.preset || 'recommended'

  let a11config: TypedFlatConfigItem[] = []
  const tsConfig = tsEnabled ? vueTs(tsPreset) : []

  const languageOptions = {
    parser: vueParser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
      extraFileExtensions: ['.vue'],
      sourceType: 'module',
      parser: tseslintVendor.parser,
    },
  } as any

  if (tsEnabled) {
    plugins['@typescript-eslint'] = tseslintVendor.plugin as ESLint.Plugin
  }

  if (typeof options === 'object' && options?.a11y) {
    assertPackage('eslint-plugin-vuejs-accessibility')
    const a11yVendor = await interopDefault(import('eslint-plugin-vuejs-accessibility'))
    a11config = a11yVendor.configs['flat/recommended']
  }

  return [
    ...a11config,
    ...tsConfig,
    {
      files: [GLOB_VUE],
      languageOptions,
      name: 'vuetify/vue',
      plugins,
      processor: vueVendor.processors['.vue'],
      rules,
    },
    {
      name: 'vuetify/vue/jsx',
      files: [GLOB_VUE, GLOB_TSX, GLOB_JSX],
      languageOptions,
      plugins,
      processor: vueVendor.processors['.vue'],
      rules: {
        'vue/attributes-order': ['error', { alphabetical: true }],
        'vue/custom-event-name-casing': ['error', 'kebab-case', { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }],
        'vue/one-component-per-file': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
      },
    },
  ]
}
