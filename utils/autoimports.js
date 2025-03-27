import { createResolver } from 'exsolve'
import { createJiti } from 'jiti';
import { resolve } from 'path'

const autoImportsFile = process.env.ESLINT_AUTO_IMPORTS_FILE ?? '.eslintrc-auto-import'

const { resolveModuleURL } = createResolver({
  extensions: ['.json', '.mjs', '.cjs', '.js', '.mts', '.cts', '.ts'],
})

export function loadAutoImports () {
  try {
    const autoImportModuleURL = resolveModuleURL(resolve('.', autoImportsFile), { try: true })
    if (!autoImportModuleURL) return {}
    
    const jiti = createJiti(import.meta.url)
    return jiti(autoImportModuleURL) ?? {}
  } catch {
    return {}
  }
}
