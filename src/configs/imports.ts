import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'

import { importPlugin } from '../vendors'

export function imports (options: Options['imports'] = true): TypedFlatConfigItem[] {
  const filesConfig = (typeof options === 'boolean' || !options.files)
    ? {}
    : { files: options.files }
  return [
    {
      name: 'vuetify/imports',
      ...filesConfig,
      plugins: { import: importPlugin },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': ['error', { 'prefer-inline': false }],
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
      },
    },
  ]
}
