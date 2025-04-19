import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'

import { gitignoreConfig } from '../vendors'

const DEFAULT_OPTIONS = {
  sources: ['.gitignore'],
  gitmodules: [],
}

export function gitignore (options: Options['gitignore'] = true): TypedFlatConfigItem {
  if (!options) {
    return {}
  }
  if (typeof options === 'boolean') {
    options = DEFAULT_OPTIONS
  }
  return gitignoreConfig({
    files: options?.sources,
    filesGitModules: options?.gitmodules,
    name: 'vuetify/gitignore',
  })
}
