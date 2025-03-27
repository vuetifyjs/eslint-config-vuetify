import type { Linter } from 'eslint';

declare module 'eslint-config-vuetify' {
  const config: Linter.Config[];
  export default config;
}

declare module './index.js.mjs' {
  const config: Linter.Config[];
}

declare module './index.ts.mjs' {
  const config: Linter.Config[];
}