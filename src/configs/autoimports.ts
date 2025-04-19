import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import { loadAutoImports } from '../utils'

export function autoimports (options: Options['autoimports'] = true): TypedFlatConfigItem {
  const autoimports = loadAutoImports(options)
  return {
    name: 'vuetfiy/autoimports',
    files: [
      GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX,
    ],
    ...autoimports,
  }
}
