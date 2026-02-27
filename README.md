<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.vuetifyjs.com/docs/images/one/logos/veslconfig-logo-dark.png">
    <img alt="Vuetify ESLint Config Logo" src="https://cdn.vuetifyjs.com/docs/images/one/logos/veslconfig-logo-light.png" height="100">
  </picture>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/eslint-config-vuetify"><img src="https://img.shields.io/npm/v/eslint-config-vuetify.svg" alt="npm version"></a>
  <a href="https://npm.chart.dev/eslint-config-vuetify"><img src="https://img.shields.io/npm/dm/eslint-config-vuetify?color=blue" alt="npm downloads"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://community.vuetifyjs.com"><img src="https://discordapp.com/api/guilds/340160225338195969/widget.png" alt="Discord"></a>
</p>

# eslint-config-vuetify

✨ An opinionated eslint config for Vuetify, crafted to keep your code clean and consistent!

### 💿 Install

<!-- automd:pm-install dev auto=false -->

```sh
# npm
npm install -D eslint-config-vuetify

# yarn
yarn add -D eslint-config-vuetify

# pnpm
pnpm install -D eslint-config-vuetify

# bun
bun install -D eslint-config-vuetify

# deno
deno install --dev eslint-config-vuetify
```

<!-- /automd -->

### 🚀 Usage

Update your `eslint.config.js` flat config to _extend_ vuetify:

```js
import vuetify from 'eslint-config-vuetify'

export default vuetify()
```

Most features are automatically detected, but you can explicitly turn them on/off or customize them

```js
import vuetify from 'eslint-config-vuetify'

export default vuetify({
  vue: true,
  ts: {
    preset: 'all',
  },
})
```

You can provide additional ESLint configurations after the options object, or directly specify them for simpler use cases where the default settings work fine:

```js
import vuetify from 'eslint-config-vuetify'

export default vuetify(
  {
    pnpm: false,
  },
  {
    plugins: {
      sonarjs,
    },
    rules: {
      ...sonarjs.configs.recommended.rules,
    },
  },
)
```

```js
import vuetify from 'eslint-config-vuetify'

export default vuetify({
  rules: {
    'no-console': 'error',
  },
})
```

### 💪 Supporting Vuetify

<p>Vuetify is an open source MIT project that has been made possible due to the generous contributions by <a href="https://github.com/vuetifyjs/vuetify/blob/dev/BACKERS.md">community backers</a>. If you are interested in supporting this project, please consider:</p>

<ul>
  <li>
    <a href="https://github.com/users/johnleider/sponsorship">Becoming a sponsor on Github</a>
    <strong><small>(supports John)</small></strong>
  </li>
  <li>
    <a href="https://opencollective.com/vuetify">Becoming a backer on OpenCollective</a>
    <strong><small>(supports the Dev team)</small></strong>
  </li>
  <li>
    <a href="https://tidelift.com/subscription/npm/vuetify?utm_source=vuetify&utm_medium=referral&utm_campaign=readme">Become a subscriber on Tidelift</a>
  </li>
  <li>
    <a href="https://paypal.me/vuetify">Make a one-time payment with Paypal</a>
  </li>
  <li>
    <a href="https://vuetifyjs.com/getting-started/consulting-and-support?ref=github">Book time with John</a>
  </li>
</ul>

### 📑 License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify LLC

----

This project exists and thrives thanks to all the wonderful people who contribute 😍
<br><br>
<a href="https://github.com/vuetifyjs/eslint-config-vuetify/graphs/contributors">
<img src="https://contrib.rocks/image?repo=vuetifyjs/eslint-config-vuetify" />
</a>
