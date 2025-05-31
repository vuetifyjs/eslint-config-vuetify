import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'
import { GLOB_VUE } from '../globs'
import { interopDefault } from '../utils'

export async function stylistic (options: Options['stylistic'] = true, optionsVue: Options['vue'] = false): Promise<TypedFlatConfigItem[]> {
  if (!options) {
    return []
  }
  const severity = (options === true || !options?.severity) ? 'error' : options.severity
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
          severity,
        }).rules,
        '@stylistic/space-before-function-paren': [
          severity,
          {
            anonymous: 'always',
            asyncArrow: 'always',
            named: 'always',
          },
        ],
        '@stylistic/brace-style': [severity, '1tbs'],
        '@stylistic/arrow-parens': [severity, 'as-needed'],
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
