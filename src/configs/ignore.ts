import type { Options } from '../schema'

import type { TypedFlatConfigItem } from '../types'

import { globalIgnores } from 'eslint/config'
import { GLOB_EXCLUDE } from '../globs'

export function ignore (options?: Options['ignore']): TypedFlatConfigItem {
  if (!options) {
    return {}
  }
  if (typeof options === 'boolean') {
    options = { ignore: GLOB_EXCLUDE }
  }
  const ignoreList = options?.ignore ?? GLOB_EXCLUDE
  const extendIgnoreList = options?.extendIgnore ?? []
  return globalIgnores([...ignoreList, ...extendIgnoreList], 'vuetify/ignore')
}
