import config from './index.js.mjs'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs([
  vueTsConfigs.recommended,
  ...config,
])
