import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    rollup: { inlineDependencies: ['valibot'], },
    externals: ['eslint-plugin-import-x']
  },
  {
    entries: ['src/cli.ts'],
  },
])
