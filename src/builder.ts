import type { Linter } from 'eslint'

import type { Arrayable, Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils'
import type { ConfigNames } from './typegen'

import type { TypedFlatConfigItem } from './types'

import { composer, concat } from 'eslint-flat-config-utils'
import { autoimports, gitignore, ignore, imports, js, perfectionist, pnpm, stylistic, test, ts, unicorn, vue } from '../src/configs'
import { getFirstConfigType, type Options, validateOptions } from '../src/schema'
import { getPackageManager } from './utils'

export async function buildConfig (maybeOptions?: Options | TypedFlatConfigItem, ...userConfigs: Awaitable<Arrayable<TypedFlatConfigItem> | FlatConfigComposer<any, any> | Linter.Config[]>[]): Promise<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>> {
  const maybeConfigType = getFirstConfigType(maybeOptions ?? {})

  const vOptions = maybeConfigType === 'options' ? validateOptions((maybeOptions ?? {}) as Options) : validateOptions({})

  const configsToCompose: Awaitable<Arrayable<TypedFlatConfigItem>>[] = []

  if (vOptions.js) {
    configsToCompose.push(js(vOptions.js))
  }

  if (vOptions.gitignore) {
    configsToCompose.push(gitignore(vOptions.gitignore))
  }

  if (vOptions.autoimports) {
    configsToCompose.push(autoimports(vOptions.autoimports))
  }

  if (vOptions.ts) {
    configsToCompose.push(ts(vOptions.ts))
  }

  if (vOptions.vue) {
    configsToCompose.push(vue(vOptions.vue, vOptions.ts))
  }

  if (vOptions.perfectionist) {
    configsToCompose.push(perfectionist(vOptions.perfectionist))
  }

  if (vOptions.stylistic) {
    configsToCompose.push(stylistic(vOptions.stylistic))
  }

  if (vOptions.imports) {
    configsToCompose.push(imports(vOptions.imports))
  }

  if (vOptions.unicorn) {
    configsToCompose.push(unicorn(vOptions.unicorn))
  }

  if (vOptions.ignore) {
    configsToCompose.push(ignore(vOptions.ignore))
  }

  if (vOptions.test) {
    configsToCompose.push(test(vOptions.test))
  }

  const pnpmEnabled = vOptions.pnpm ?? (await getPackageManager())?.name === 'pnpm'

  if (pnpmEnabled) {
    configsToCompose.push(pnpm())
  }

  if (maybeConfigType === 'config' && maybeOptions) {
    configsToCompose.push(maybeOptions as TypedFlatConfigItem)
  }

  let composed = composer(await concat(
    ...configsToCompose,
    ...userConfigs as TypedFlatConfigItem[],
  ))

  const editorMode = vOptions?.isInEditor ?? false

  if (editorMode) {
    composed = composed
      .disableRulesFix(
        ['unused-imports/no-unused-imports', 'test/no-only-tests', 'prefer-const'],
        { builtinRules: () => import(['eslint', 'use-at-your-own-risk'].join('/')).then(r => r.builtinRules) })
  }

  return composed
}
