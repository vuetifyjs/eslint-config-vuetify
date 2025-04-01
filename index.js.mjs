import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defu } from 'defu'
import { loadAutoImports } from './utils/autoimports.mjs'
import { globalIgnores } from 'eslint/config'

const autoImports = loadAutoImports()

export default [
  globalIgnores(['dist/**'], 'ignore dist folder'),
  eslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,ts,mts,tsx,vue}'],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: defu(autoImports, {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    }),
    rules: {
      complexity: ['error', 32],
      'no-case-declarations': 'off',
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-empty': 'error',
      'no-prototype-builtins': 'off',
      'no-return-assign': 'off',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'no-void': 'off',
      'object-shorthand': ['error', 'always'],
      'prefer-const': ['error', {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      }],
      'sort-imports': ['warn', {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      }],

      // stylistic
      '@stylistic/indent': ['error', 2],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0, 'maxBOF': 0 }],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single', {
        allowTemplateLiterals: true,
        avoidEscape: true,
      }],
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          asyncArrow: 'always',
          named: 'always',
        },
      ],

      // vue for non-vue files
      'vue/attributes-order': ['error', {
        alphabetical: true,
      }],
      'vue/custom-event-name-casing': ['error', 'kebab-case', { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }],
      'vue/one-component-per-file': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
    },
  },

  {
    name: 'app/overrides',
    files: ['**/*.vue'],
    rules: {
      '@stylistic/indent': 'off',
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/html-closing-bracket-spacing': 'error',
      'vue/max-attributes-per-line': ['error', {
        singleline: 4,
        multiline: 1,
      }],
      'vue/multi-word-component-names': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/no-v-html': 'off',
      'vue/script-indent': ['error', 2, {
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
      }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/valid-v-on': 'off', // This rule doesn't allow empty event listeners
      'vue/valid-v-slot': ['error', { allowModifiers: true }],
    },
  },
]
