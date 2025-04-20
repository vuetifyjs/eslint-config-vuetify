import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'
import { GLOB_VUE } from '../globs'
import { interopDefault } from '../utils'

export async function stylistic (options: Options['stylistic'] = true, optionsVue: Options['vue'] = false): Promise<TypedFlatConfigItem[]> {
  if (!options) {
    return []
  }
  const stylisticPlugin = await interopDefault(import('@stylistic/eslint-plugin'))
  const stylistic: TypedFlatConfigItem[] = [
    {
      name: 'vuetify/stylistic',
      plugins: { '@stylistic': stylisticPlugin },
      rules: {
        ...stylisticPlugin.configs.customize({
          indent: 2,
          jsx: true,
          quotes: 'single',
          semi: false,
        }).rules,
        '@stylistic/space-before-function-paren': [
          'error',
          {
            anonymous: 'always',
            asyncArrow: 'always',
            named: 'always',
          },
        ],
        '@stylistic/brace-style': ['error', '1tbs'],
      },
    },
  ]
  if (optionsVue) {
    stylistic.push({
      files: [GLOB_VUE],
      name: 'vuetify/stylistic/vue',
      rules: { '@stylistic/indent': ['off'] },
    })
  }
  return stylistic
}
