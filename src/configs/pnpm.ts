import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'
import { hasFile } from '../utils'
import { jsoncParser, pnpmPlugin, yamlParser } from '../vendors'

const hasWorkspace = hasFile('pnpm-workspace.yaml')

export function pnpm (options: Options['pnpm'] = true): TypedFlatConfigItem[] {
  const enforceCatalog = typeof options === 'object' ? (options.enforceCatalog ?? false) : false
  const packageJsonFiles = (typeof options === 'object' && options.files) ? options.files : ['package.json', '**/package.json']
  return [
    {
      ignores: ['**/node_modules/**', '**/dist/**'],
      files: packageJsonFiles,
      languageOptions: { parser: jsoncParser },
      name: 'vuetify/pnpm/package-json',
      plugins: { pnpm: pnpmPlugin },
      rules: {
        'pnpm/json-prefer-workspace-settings': hasWorkspace ? 'error' : 'off',
        'pnpm/json-enforce-catalog': enforceCatalog ? 'error' : 'off',
        'pnpm/json-valid-catalog': enforceCatalog ? 'error' : 'off',
      },
    },
    {
      files: ['pnpm-workspace.yaml'],
      languageOptions: { parser: yamlParser },
      name: 'vuetify/pnpm/pnpm-workspace-yaml',
      plugins: { pnpm: pnpmPlugin },
      rules: {
        'pnpm/yaml-no-duplicate-catalog-item': 'error',
        'pnpm/yaml-no-unused-catalog-item': 'error',
      },
    },
  ]
}
