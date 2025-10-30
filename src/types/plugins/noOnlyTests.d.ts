/* eslint-disable */
/* prettier-ignore */

declare module 'eslint-plugin-no-only-tests' {
  interface RuleOptions {
    /**
     * disallow .only blocks in tests
     * @see https://github.com/levibuzolic/eslint-plugin-no-only-tests
     */
    'no-only-tests'?: import('eslint').Linter.RuleEntry<NoOnlyTests>
  }
  
  type NoOnlyTests = [] | [{
    block?: string[]
    focus?: string[]
    functions?: string[]
    fix?: boolean
  }]

  const rules: RuleOptions
  const plugin: import('eslint').ESLint.Plugin

  export { plugin, rules }
}