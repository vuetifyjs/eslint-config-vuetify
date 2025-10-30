import type { Options } from '../schema'
import type { TypedFlatConfigItem } from '../types'
import { GLOB_TESTS } from '../globs'
import { assertPackage, hasPackage, interopDefault } from '../utils'

export async function test (options: Options['test'] = true): Promise<TypedFlatConfigItem> {
  if (!options) {
    return {}
  } else if (options === true) {
    if (!hasPackage('@vitest/eslint-plugin') && !hasPackage('eslint-plugin-jest')) {
      return {}
    } else {
      options = { files: GLOB_TESTS, runner: hasPackage('@vitest/eslint-plugin') ? 'vitest' : 'jest' }
    }
  }
  const files = options?.files ?? GLOB_TESTS
  const runner = options?.runner
  if (runner === 'vitest') {
    await assertPackage('@vitest/eslint-plugin', 'test: false')
    const vitestVendor = await interopDefault(import('@vitest/eslint-plugin'))
    // @ts-ignore
    const noOnlyTests = await interopDefault(import('eslint-plugin-no-only-tests'))
    const config = [
      {
        files,
        plugins: {
          'vitest': vitestVendor,
          'no-only-tests': noOnlyTests,
        },
        rules: {
          ...vitestVendor.configs.recommended.rules,
          'no-only-tests/no-only-tests': 'error',
        },
      },
    ]
    return config as TypedFlatConfigItem
  }
  if (runner === 'jest') {
    await assertPackage('eslint-plugin-jest', 'test: false')
    const jestVendor = await interopDefault(import('eslint-plugin-jest'))
    const noOnlyTests = await interopDefault(import('eslint-plugin-no-only-tests'))
    const config = [
      {
        files,
        plugins: {
          'jest': jestVendor,
          'no-only-tests': noOnlyTests,
        },
        languageOptions: { globals: jestVendor.environments.globals.globals },
        rules: {
          'jest/no-disabled-tests': 'warn',
          'jest/no-focused-tests': 'error',
          'jest/no-identical-title': 'error',
          'jest/prefer-to-have-length': 'warn',
          'jest/valid-expect': 'error',
          'no-only-tests/no-only-tests': 'error',
        },
      },
    ]
    return config as TypedFlatConfigItem
  }
  return {}
}
