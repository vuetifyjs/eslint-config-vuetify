import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'

import { perfectionistPlugin } from '../vendors'

export function perfectionist (options: Options['perfectionist'] = true): TypedFlatConfigItem[] {
  const filesConfig = (typeof options === 'boolean')
    ? {}
    : { files: options.files }
  const importRules = options === true || (options && options?.import !== false)
  const exportRules = options === true || (options && options?.export !== false)
  if (!importRules && !exportRules) {
    return []
  }

  const rules: Record<string, any> = {}
  if (importRules) {
    rules['perfectionist/sort-imports'] = [
      'error',
      {
        groups: [
          'type',
          [
            'parent-type', 'sibling-type', 'index-type', 'internal-type',
          ],

          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'side-effect',
          'object',
          'unknown',
        ],
        newlinesBetween: 'ignore',
        order: 'asc',
        type: 'natural',
      },
    ]
    rules['perfectionist/sort-named-imports'] = ['error', { order: 'asc', type: 'natural' }]
  }
  if (exportRules) {
    rules['perfectionist/sort-exports'] = ['error', { order: 'asc', type: 'natural' }]
    rules['perfectionist/sort-named-exports'] = ['error', { order: 'asc', type: 'natural' }]
  }

  return [
    {
      name: 'vuetify/perfectionist',
      ...filesConfig,
      plugins: { perfectionist: perfectionistPlugin },
      rules,
    },
  ]
}
