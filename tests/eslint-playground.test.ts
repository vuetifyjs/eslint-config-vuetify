import { ESLint } from 'eslint'
import vuetify from 'eslint-config-vuetify'
import { describe, expect, it } from 'vitest'

const cwd = new URL('..', import.meta.url).pathname

describe('lint: work with playground', () => {
  const playgroundFiles = [
    'playground/App.jsx',
    'playground/App.ts',
    'playground/App.tsx',
    'playground/App.vue',
  ]

  it.each(playgroundFiles)('should lint %s without fatal errors', async file => {
    const eslint = new ESLint({
      cwd,
    })
    const results = await eslint.lintFiles([file])
    expect(results.length).toBe(1)
    const [result] = results
    expect(result!.fatalErrorCount).toBe(0)
    expect(result!.errorCount).toBeGreaterThanOrEqual(0)
  })
})

describe('lint: work with playground with config', () => {
  describe('valid configs', () => {
    const args = [
      { config: [] },
      { config: [null] },
      { config: [undefined] },
      { config: [{}] },
      // test different ts presets
      { config: [{ ts: { preset: 'strict' } }] },
      { config: [{ ts: { preset: 'recommendedTypeChecked' } }] },
      { config: [{ ts: { preset: 'all' } }] },
      // test perfectionist
      { config: [{ perfectionist: true }] },
      { config: [{ perfectionist: { imports: true } }] },
      // test config as first argument
      { config: [{ rules: { 'no-semi': 'off' } }], files: ['playground/App.jsx'] },
    ] as Array<{ config: Array<any>, files?: Array<string> }>

    for (const arg of args) {
      const filesToCheck = arg.files ?? ['playground/App.jsx']
      it('should lint playground with config without fatal errors', async () => {
        const eslint = new ESLint({
          cwd,
          overrideConfig: await vuetify(...arg.config),
        })
        const results = await eslint.lintFiles(filesToCheck)
        expect(results.length).toBe(1)
        const [result] = results
        expect(result!.fatalErrorCount).toBe(0)
        expect(result!.errorCount).toBeGreaterThanOrEqual(0)
      })
    }
  })

  describe('invalid configs', () => {
    const invalidConfigs = [
      { config: [{ extends: 123 }] },
    ] as Array<{ config: Array<any> }>

    it.each(invalidConfigs)('should throw for invalid config %j', async ({ config }) => {
      await expect(async () => {
        const eslint = new ESLint({
          cwd,
          overrideConfig: await vuetify(...config),
        })
        await eslint.lintFiles(['playground/App.jsx'])
      }).rejects.toThrow()
    })
  })
})
