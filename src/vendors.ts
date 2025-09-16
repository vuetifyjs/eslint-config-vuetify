/* eslint-disable perfectionist/sort-exports */

// configs
export { default as gitignoreConfig } from 'eslint-config-flat-gitignore'

// plugins
export { default as importPlugin } from 'eslint-plugin-import-lite'
export { default as perfectionistPlugin } from 'eslint-plugin-perfectionist'
export { plugin as pnpmPlugin } from 'eslint-plugin-pnpm'

// vendors
export { default as tseslintVendor } from 'typescript-eslint'
export { default as unicornVendor } from 'eslint-plugin-unicorn'
export { default as vueVendor } from 'eslint-plugin-vue'

// parsers
export * as vueParser from 'vue-eslint-parser'
export * as jsoncParser from 'jsonc-eslint-parser'
export * as yamlParser from 'yaml-eslint-parser'
export * as tsParser from '@typescript-eslint/parser'
