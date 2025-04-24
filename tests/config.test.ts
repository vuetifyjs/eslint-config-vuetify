import type { Options } from '../src/schema'

import { describe, expect, it, test } from 'vitest'
import { validateOptions } from '../src/schema'

describe('validateOptions: full and edge case validation', () => {
  const validOptions: Options = {
    ts: true,
    vue: true,
    autoimports: true,
    perfectionist: true,
    isInEditor: true,
    stylistic: true,
    test: true,
    pnpm: true,
    gitignore: true,
    ignore: true,
    js: true,
    imports: true,
    unicorn: true,
    json: true,
  }

  it('should validate all options correctly', () => {
    expect(() => validateOptions(validOptions)).not.toThrow()
  })

  it('should throw for wrong type in nested option', () => {
    const options = { ...validOptions, test: { runner: 123 } }
    expect(() => validateOptions(options as any)).toThrow()
  })

  it('should not throw for empty object', () => {
    expect(() => validateOptions({} as any)).not.toThrow()
  })

  it('should allow minimal valid config', () => {
    const minimal = { ts: true }
    expect(() => validateOptions(minimal as any)).not.toThrow()
  })

  it('should throw for unknown option', () => {
    const options = { ...validOptions, unknown: true }
    expect(() => validateOptions(options as any)).toThrow()
  })

  it('should throw for null option', () => {
    expect(() => validateOptions(null as any)).toThrow()
  })
})

describe('validateOptions: partial and matrix edge cases', () => {
  const matrix = [
    { key: 'ts', values: [true, false, { files: ['src/**/*.ts'] }, { preset: 'strict' }, { files: ['src/a.ts'], preset: 'all' }] },
    { key: 'vue', values: [true, false, { files: ['src/**/*.vue'] }, { a11y: true }, { files: ['src/a.vue'], a11y: false }] },
    { key: 'perfectionist', values: [true, false, { files: ['src/**/*.js'] }, { import: true }, { export: false }, { import: false, export: false }] },
  ]

  describe.each(matrix)('$key option variations', ({ key, values }) => {
    test.each(values.map((val, idx) => [idx, val]))('should validate partial config for %s (variant %i)', (idx, val) => {
      const options = { [key]: val }
      expect(() => validateOptions(options as any)).not.toThrow()
    })
  })

  it('should throw for invalid ts object', () => {
    expect(() => validateOptions({ ts: { preset: 'invalid' } } as any)).toThrow()
  })
  it('should throw for invalid vue object', () => {
    expect(() => validateOptions({ vue: { a11y: 'yes' } } as any)).toThrow()
  })
  it('should throw for invalid perfectionist object', () => {
    expect(() => validateOptions({ perfectionist: { import: 'nope' } } as any)).toThrow()
  })
})
