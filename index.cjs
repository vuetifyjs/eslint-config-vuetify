import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,ts,mts,tsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'array-bracket-spacing': ['error', 'never'],
      // allow paren-less arrow functions
      'arrow-parens': ['error', 'as-needed'],
      complexity: ['error', 32],
      'no-console': 'off',
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      }],
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-empty': 'error',
      'no-return-assign': 'off',
      'no-return-await': 'warn',
      'object-shorthand': ['error', 'always'],
      'no-extra-semi': 'error',
      'no-case-declarations': 'off',
      'no-prototype-builtins': 'off',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'no-void': 'off',
      'multiline-ternary': 'off',
      'object-curly-spacing': ['error', 'always'],
      'prefer-const': ['error', {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      }],
      'prefer-const': ['error', {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      }],
      quotes: ['error', 'single', {
        avoidEscape: true,
        allowTemplateLiterals: true,
      }],

      'sort-imports': ['warn', {
        ignoreDeclarationSort: true,
        ignoreCase: true,
      }],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'always',
          asyncArrow: 'always',
        },
      ],

      // Not in override, these apply to non-.vue files too
      'vue/attributes-order': ['error', {
        alphabetical: true,
      }],
      'vue/one-component-per-file': 'off',
      'vue/custom-event-name-casing': ['error', { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }],
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
    }
  },

  {
    name: 'app/overrides',
    files: '**/*.vue',
    rules: {
      indent: 'off',
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/html-closing-bracket-spacing': 'error',
      'vue/no-v-html': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: 4,
        multiline: 1,
      }],
      'vue/multi-word-component-names': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/script-indent': ['error', 2, {
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
      }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/valid-v-on': 'off', // This rule doesn't allow empty event listeners
      'vue/valid-v-slot': ['error', { allowModifiers: true }],
    }
  }
]
