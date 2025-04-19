import type { Options } from '../schema';
import type { TypedFlatConfigItem } from '../types'
import { resolve } from 'node:path'

import { FlatCompat } from '@eslint/eslintrc'
import { createResolver } from 'exsolve'

const compat = new FlatCompat({});

const DEFAULT_AUTO_IMPORTS_PATH = '.eslintrc-auto-import'

const { resolveModulePath } = createResolver({ extensions: ['.json'] })

export function loadAutoImports (options: Options['autoimports'] = true): TypedFlatConfigItem {
  if (!options) {
    return {}
  }
  if (typeof options === 'object' && typeof options.src === 'object') {
    return { languageOptions: options.src as TypedFlatConfigItem['languageOptions'] }
  }
  const autoImportsFile = (typeof options === 'object' && typeof options.src === 'string') ? options.src : DEFAULT_AUTO_IMPORTS_PATH
  try {
    const autoImportModuleURL = resolveModulePath(resolve('.', autoImportsFile), { try: true })
    if (!autoImportModuleURL) {
      return {}
    }
    return compat.extends(autoImportModuleURL) as TypedFlatConfigItem
  } catch {
    return {}
  }
}
