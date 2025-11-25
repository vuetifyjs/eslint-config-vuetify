import type { BasePackageJson } from './types'
import { readFile, writeFile } from 'node:fs/promises'
import { relative } from 'node:path'
import { confirm, intro, log, outro, spinner } from '@clack/prompts'
import { ansi256, underline } from 'kolorist'
import { addDevDependency } from 'nypm'
import { resolveCommand } from 'package-manager-detector/commands'
import { x } from 'tinyexec'
import { ESLINT, ESLINT_CONFIG, LINKS, VUETIFY } from './constants/cli'
import { configData } from './constants/config'
import { configUrl, getPackageManager, getPackageVersion, hasFile, hasPackage, isVersionAtLeast } from './utils'

const blue = ansi256(33)
const description = `Welcome to ${blue(ESLINT_CONFIG)} — an opinionated ESLint config by the ${blue(LINKS[VUETIFY])} team.`

const eslintVersion = getPackageVersion(ESLINT) ?? '0.0.0'
const configVersion = getPackageVersion(ESLINT_CONFIG) ?? '0.0.0'

const hasEslint = hasPackage(ESLINT)
const hasEslintConfig = hasPackage(ESLINT_CONFIG)

const isEslintVersionValid = isVersionAtLeast(eslintVersion, '9.5.0')
const isConfigVersionValid = isVersionAtLeast(configVersion, '4.0.0')

const packagesToInstall = [
  ...(hasEslint ? [] : [ESLINT]),
  ...(hasEslintConfig ? [] : [ESLINT_CONFIG]),
] as Array<typeof ESLINT | typeof ESLINT_CONFIG>

const packagesToUpgrade = [
  ...(isEslintVersionValid ? [] : [ESLINT]),
  ...(isConfigVersionValid ? [] : [ESLINT_CONFIG]),
] as Array<typeof ESLINT | typeof ESLINT_CONFIG>

function getActionMessage () {
  const actions = []
  if (packagesToInstall.length > 0) {
    actions.push(`install ${packagesToInstall.map(pkg => LINKS[pkg]).join(', ')}`)
  }
  if (packagesToUpgrade.length > 0) {
    const upgradeAction = `upgrade ${packagesToUpgrade.map(pkg => LINKS[pkg]).join(', ')}`
    if (packagesToInstall.length > 0) {
      actions.push(`and ${upgradeAction}`)
    } else {
      actions.push(upgradeAction)
    }
  }

  if (hasEslint || hasEslintConfig) {
    actions.push('(Currently:')
    if (hasEslint) {
      actions.push(`  ${ESLINT}: ${eslintVersion}`)
    }
    if (hasEslintConfig) {
      actions.push(`  ${ESLINT_CONFIG}: ${configVersion}`)
    }
    actions.push(')')
  }
  return `We need to ${actions.join(' ')}.`
}

export async function main () {
  intro(description)

  if (packagesToInstall.length > 0 || packagesToUpgrade.length > 0) {
    log.info(getActionMessage())
    const shouldInstall = await confirm({
      message: 'Do you want to proceed?',
    })
    if (shouldInstall === true) {
      const s = spinner()
      s.start('Installing dependencies...')
      if (packagesToInstall.length > 0) {
        await addDevDependency(packagesToInstall)
      }
      if (packagesToUpgrade.length > 0) {
        const packageManager = await getPackageManager()
        const upgradeCommand = resolveCommand(packageManager!.agent, 'upgrade', packagesToUpgrade)
        await x(upgradeCommand!.command, upgradeCommand!.args)
      }
      s.stop('Dependencies installed!')
    }
  } else {
    log.info('All required dependencies are already installed.')
  }

  let overwriteConfig = false as boolean | symbol
  overwriteConfig = await (configUrl
    ? confirm({
        message: `Found ${underline(relative(process.cwd(), configUrl))}. Do you want to overwrite it?`,
      })
    : confirm({
        message: 'No ESLint config found. Do you want to create one?',
      }))

  if (overwriteConfig === true) {
    const s = spinner()
    s.start('Setting up ESLint config...')
    await writeFile(configUrl ?? 'eslint.config.mjs', configData)
    s.stop('ESLint config setup complete!')
  }

  // Add lint and lint:fix scripts to package.json
  if (hasFile('package.json')) {
    const packageJson = JSON.parse(await readFile('package.json', 'utf8')) as BasePackageJson
    if (!packageJson.scripts) {
      packageJson.scripts = {}
    }

    const hasLintAndFixScripts = packageJson.scripts.lint && packageJson.scripts['lint:fix']
    const shouldAddScripts = hasLintAndFixScripts
      ? false
      : await confirm({
          message: 'Do you want to add lint scripts to package.json?',
        })

    if (shouldAddScripts === true) {
      if (!packageJson.scripts.lint) {
        packageJson.scripts.lint = 'eslint'
      }
      if (!packageJson.scripts['lint:fix']) {
        packageJson.scripts['lint:fix'] = 'eslint --fix'
      }
      await writeFile('package.json', JSON.stringify(packageJson, null, 2))
    }
  }

  outro('All done! Happy hacking!')
}
