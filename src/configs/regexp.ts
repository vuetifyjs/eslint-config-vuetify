import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'

import { regexpVendor } from '../vendors'

export function regexp (options: Options['regexp'] = true): TypedFlatConfigItem[] {
  const filesConfig = (typeof options === 'boolean' || !options.files)
    ? {}
    : { files: options.files }
  return [
    {
      ...filesConfig,
      ...regexpVendor.configs['flat/recommended'],
      name: 'vuetify/regexp/recommended',
    },
  ]
}
