import withConfig from 'eslint-config-vuetify'

export default withConfig(
  {
    files: ['**/*.js'],
    rules: {
      '@stylistic/comma-dangle': ['error', 'never'],
      'import/default': 'off'
    }
  })
