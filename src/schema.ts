import * as v from 'valibot'
import { hasFile, hasPackage, isInEditorEnv } from './utils'

const baseBoolSchema = v.exactOptional(
  v.union([v.boolean(), v.object({ files: v.array(v.string()) })]),
  true
)

export const tsPresets = v.union([
  v.literal('recommended'), v.literal('strict'), v.literal('recommendedTypeChecked'), v.literal('strictTypeChecked'), v.literal('all'),
])

export type TsPresets = v.InferInput<typeof tsPresets>

export const isInEditorSchema = v.exactOptional(v.boolean(), isInEditorEnv())

export const typescriptSchema = v.exactOptional(
  v.union([
    v.boolean(),
    v.object({
      files: v.array(v.string()),
      preset: v.exactOptional(tsPresets, 'recommended'),
    }),
  ]),
  hasPackage('typescript')
)

export const vueSchema = v.exactOptional(
  v.union([
    v.boolean(),
    v.object({
      files: v.array(v.string()),
      a11y: v.exactOptional(v.boolean()),
    }),
  ]),
  hasPackage('vue') || hasPackage('@vue/compat')
)

export const perfectionistSchema = v.exactOptional(
  v.union([
    v.boolean(),
    v.object({
      files: v.array(v.string()),
      import: v.exactOptional(v.boolean()),
      export: v.exactOptional(v.boolean()),
    }),
  ]),
  true
)

const globalSchema = v.record(
  v.string(),
  v.union([
    v.boolean(), v.literal('off'), v.literal('readable'), v.literal('readonly'), v.literal('writable'), v.literal('writeable'),
  ])
)

export const autoImportsSchema = v.exactOptional(
  v.union([
    v.boolean(),
    v.object({
      files: v.array(v.string()),
      src: v.exactOptional(v.union([v.string(), v.object({ globals: globalSchema })])),
    }),
  ]),
  true
)

export const stylisticSchema = baseBoolSchema
export const jsSchema = baseBoolSchema
export const importsSchema = baseBoolSchema
export const unicornSchema = baseBoolSchema
export const jsonCSchema = baseBoolSchema

export const testSchema = v.exactOptional(
  v.union([
    v.boolean(),
    v.object({
      runner: v.exactOptional(v.union([v.literal('jest'), v.literal('vitest')])),
      files: v.exactOptional(v.array(v.string())),
    }),
  ]),
  hasPackage('jest') || hasPackage('vitest')
)

export const gitignoreSchema = v.exactOptional(
  v.union([
    v.boolean(),
    v.object({
      sources: v.exactOptional(v.array(v.string())),
      gitmodules: v.exactOptional(v.array(v.string())),
    }),
  ]),
  hasFile('.gitignore')
)

export const pnpmSchema = v.exactOptional(
  v.union([v.boolean()]),
)

export const ignoreSchema = v.exactOptional(
  v.union([
    v.boolean(),
    v.object({
      ignore: v.exactOptional(v.array(v.string())),
      extendIgnore: v.exactOptional(v.array(v.string())),
    }),
  ]),
  true
)

export const optionsSchema = v.strictObject({
  ts: typescriptSchema,
  vue: vueSchema,
  autoimports: autoImportsSchema,
  perfectionist: perfectionistSchema,
  isInEditor: isInEditorSchema,
  stylistic: stylisticSchema,
  test: testSchema,
  pnpm: pnpmSchema,
  gitignore: gitignoreSchema,
  ignore: ignoreSchema,
  js: jsSchema,
  imports: importsSchema,
  unicorn: unicornSchema,
  json: jsonCSchema,
})

export type Options = v.InferInput<typeof optionsSchema>

export const configSchema = v.object({
  name: v.optional(v.any()),
  files: v.optional(v.any()),
  ignores: v.optional(v.any()),
  language: v.optional(v.any()),
  languageOptions: v.optional(v.any()),
  linterOptions: v.optional(v.any()),
  processor: v.optional(v.any()),
  plugins: v.optional(v.any()),
  rules: v.optional(v.any()),
  settings: v.optional(v.any()),
})

export type OptionsConfig = v.InferInput<typeof configSchema>

export function validateOptions (options?: Options) {
  return v.parse(optionsSchema, options)
}

const strictObject = v.strictObject({})

export function getFirstConfigType (maybeConfig: Options | OptionsConfig): 'options' | 'config' {
  if (v.safeParse(strictObject, maybeConfig).success) {
    return 'options'
  }
  if (v.safeParse(optionsSchema, maybeConfig).success) {
    return 'options'
  }
  return 'config'
}
