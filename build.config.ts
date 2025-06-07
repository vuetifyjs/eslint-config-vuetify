import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    rollup: { inlineDependencies: ['valibot'] },
  },
  {
    entries: ['src/cli.ts'],
  },
])
