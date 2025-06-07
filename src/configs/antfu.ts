import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'
import { interopDefault } from '../utils'

export async function antfu (options: Options['antfu'] = true): Promise<TypedFlatConfigItem[]> {
  const filesConfig = (typeof options === 'boolean' || !options.files)
    ? {}
    : { files: options.files }
  const antfuPlugin = await interopDefault(import('eslint-plugin-antfu'))
  return [
    {
      name: 'vuetify/antfu',
      ...filesConfig,
      plugins: { antfu: antfuPlugin },
      rules: {
        'antfu/import-dedupe': 'error',
        'antfu/top-level-function': 'error',
        'antfu/no-import-node-modules-by-path': 'error',
        'antfu/consistent-chaining': 'error',
      },
    },
  ]
}
