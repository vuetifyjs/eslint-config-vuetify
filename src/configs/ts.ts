import type { Options, TsPresets } from '../schema'
import type { TypedFlatConfigItem } from '../types'

import { GLOB_JS, GLOB_TS, GLOB_TSX } from '../globs'
import { tseslintVendor } from '../vendors'

export function typescriptCore (preset: TsPresets): TypedFlatConfigItem[] {
  return tseslintVendor.config({
    extends: [...tseslintVendor.configs[preset]],
    files: [GLOB_TS, GLOB_TSX],
    name: 'vuetify/typescript',
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }],

      'no-unused-vars': 'off',
      'no-unused-expressions': 'off',
      'no-restricted-syntax': ['error', 'TSEnumDeclaration[const=true]'],
      'no-dupe-class-members': 'off',
      'no-redeclare': 'off',
      'no-use-before-define': 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    },
  }) as TypedFlatConfigItem[]
}

export function typescript (options: Options['ts'] = true): TypedFlatConfigItem[] {
  if (!options) {
    return []
  }
  const preset = (options === true || !options?.preset) ? 'recommended' : options.preset
  const projectService = (typeof options === 'object' && options?.projectService) || ['recommendedTypeChecked', 'strictTypeChecked', 'all'].includes(preset)
  const tsconfigRootDir = typeof options === 'object' ? options?.tsconfigRootDir : undefined

  return [
    ...typescriptCore(preset),
    {
      languageOptions: {
        parserOptions: {
          projectService,
          tsconfigRootDir,
        },
      },
    },
    {
      files: ['**/*.d.ts'],
      name: 'vuetify/typescript/dts',
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      files: [GLOB_JS, '**/*.cjs'],
      name: 'vuetify/typescript/cjs-rules',
      rules: { '@typescript-eslint/no-require-imports': 'off' },
    },
  ]
}
