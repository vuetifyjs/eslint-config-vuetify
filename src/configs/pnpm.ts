import type { TypedFlatConfigItem } from '../types'

import { jsoncParser, pnpmPlugin, yamlParser } from '../vendors'

export function pnpm (): TypedFlatConfigItem[] {
  return [
    {
      ignores: ['**/node_modules/**', '**/dist/**'],
      files: ['package.json', '**/package.json'],
      languageOptions: { parser: jsoncParser },
      name: 'vuetify/pnpm/package-json',
      plugins: { pnpm: pnpmPlugin },
      rules: {
        'pnpm/json-prefer-workspace-settings': 'error',
        'pnpm/json-valid-catalog': 'error',
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
