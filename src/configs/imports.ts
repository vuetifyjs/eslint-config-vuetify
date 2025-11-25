import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'
import { assertPackage } from '../utils'

export async function imports (options: Options['imports'] = true): Promise<TypedFlatConfigItem[]> {
  const filesConfig = (typeof options === 'boolean' || !options?.files)
    ? {}
    : { files: options.files }

  const pluginType = (typeof options === 'boolean' || !options?.plugin)
    ? 'import-lite'
    : options.plugin

  let selectedPlugin
  if (pluginType === 'import-x') {
    await assertPackage('eslint-plugin-import-x', 'import: { plugin: "import-lite" }')
    selectedPlugin = (await import('eslint-plugin-import-x')).default
  } else {
    selectedPlugin = (await import('eslint-plugin-import-lite')).default
  }

  return [
    {
      name: 'vuetify/imports',
      ...filesConfig,
      plugins: { import: selectedPlugin },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': ['error', { 'prefer-inline': false }],
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
      },
    },
  ]
}
