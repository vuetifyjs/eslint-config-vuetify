module.exports = {
  extends: ['standard', 'plugin:vue/recommended'],

  parserOptions: {
    parser: require.resolve('babel-eslint'),
    ecmaVersion: 2017,
    sourceType: 'module'
  },

  rules: {
    'max-len': 'off',
    'vue/max-attributes-per-line': ['error', {
      'singleline': 5,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }]
  },
  overrides: [
    {
      files: '**/*.vue',
      rules: {
        indent: 'off',
        'vue/script-indent': ['error', 2, {
          'baseIndent': 1,
          'switchCase': 1,
          'ignores': []
        }],
        'vue/html-closing-bracket-newline': ['error', {
          'singleline': 'never',
          'multiline': 'always'
        }],
        'vue/html-closing-bracket-spacing': 'error'
      }
    }
  ]
}
