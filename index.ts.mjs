import vueTsEslintConfig from '@vue/eslint-config-typescript'
import config from './index.js.mjs'

export default [
  ...vueTsEslintConfig(),
  ...config,
]
