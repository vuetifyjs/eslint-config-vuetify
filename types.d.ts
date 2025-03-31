import type { Linter } from 'eslint';

declare module 'eslint-config-vuetify' {
  const config: Linter.Config[];
  export default config;
}

declare module 'eslint-config-vuetify/index.js.mjs' {
  const config: Linter.Config[];
}

declare module 'eslint-config-vuetify/index.ts.mjs' {
  const config: Linter.Config[];
}
