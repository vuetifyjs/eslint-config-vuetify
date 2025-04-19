import fs from 'node:fs/promises'
import { concat } from 'eslint-flat-config-utils'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'

import { autoimports, gitignore, ignore, imports, js, jsonc, perfectionist, pnpm, stylistic, test, ts, unicorn, vue } from '../src/configs'

console.log('Generating typegen.d.ts...')

const configs = await concat(
  { plugins: { '': { rules: Object.fromEntries(builtinRules.entries()) } } },
  gitignore(),
  js(),
  imports(),
  autoimports(),
  unicorn(),
  perfectionist(),
  vue(),
  ts(),
  stylistic(),
  pnpm(),
  test({ runner: 'vitest' }),
  test({ runner: 'jest' }),
  ignore(),
  jsonc(true, true)
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, { includeAugmentation: false })

dts += `
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)

console.log('Generated typegen.d.ts')
