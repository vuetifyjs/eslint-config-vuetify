import { defineConfig } from 'tsdown'

export default defineConfig([{
  entry: 'src/index.ts',
  deps: {
    alwaysBundle: ['valibot'],
    neverBundle: ['eslint-plugin-import-x'],
  },
  exports: true,
}, {
  entry: 'src/cli.ts',
  exports: true,
}])
