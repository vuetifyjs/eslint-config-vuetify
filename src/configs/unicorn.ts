import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'

import { unicornVendor } from '../vendors'

export function unicorn (options: Options['unicorn'] = true): TypedFlatConfigItem[] {
  const filesConfig = (typeof options === 'boolean' || !options.files)
    ? {}
    : { files: options.files }
  return [
    {
      ...filesConfig,
      ...unicornVendor.configs['recommended'],
      name: 'vuetify/unicorn/recommended',
    },
    {
      ...filesConfig,
      name: 'vuetify/unicorn',
      rules: {
        'unicorn/filename-case': 'off',
        'unicorn/no-null': 'off',
        'unicorn/number-literal-case': 'off',
        'unicorn/template-indent': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/no-await-expression-member': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-array-push-push': 'off',
        'unicorn/prefer-string-replace-all': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/import-style': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/prefer-global-this': 'off',
      },
    },
  ]
}
