import type { Awaitable } from 'eslint-flat-config-utils'
import { existsSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { confirm, outro, spinner } from '@clack/prompts'
import { blue, underline } from 'kolorist'
import { isPackageExists } from 'local-pkg'
import { addDevDependency } from 'nypm'
import { detect } from 'package-manager-detector'

const hasVuetifyConfig = hasPackage('eslint-config-vuetify')

export async function interopDefault<T> (m: Awaitable<T>): Promise<T extends {
  default: infer U
} ? U : T> {
  const awaited = await m
  return (awaited as any).default ?? awaited
}

export function isInEditorEnv (): boolean {
  if (process.env.CI) {
    return false
  }
  if (isInGitHooksOrLintStaged()) {
    return false
  }
  return !!(
    process.env.VSCODE_PID
    || process.env.VSCODE_CWD
    || process.env.JETBRAINS_IDE
    || process.env.VIM
    || process.env.NVIM
  )
}

export function isInGitHooksOrLintStaged (): boolean {
  return !!(
    process.env.GIT_PARAMS
    || process.env.VSCODE_GIT_COMMAND
    || process.env.npm_lifecycle_script?.startsWith('lint-staged')
  )
}

export function hasPackage (pkg: string, scope?: string): boolean {
  return isPackageExists(pkg, { paths: scope ? [scope] : [] })
}

const currentScope = new URL('.', import.meta.url).pathname
const currentRoot = process.cwd()

export async function assertPackage (pkg: string, setting?: string): Promise<void> {
  if (!hasPackage(pkg, currentScope)) {
    if (process.env.CI || process.stdout.isTTY === false || !hasVuetifyConfig) {
      return
    }
    const result = await confirm({
      message: `Package ${pkg} is required for this config but not installed. Do you want to install it?`,
    })
    if (result === true) {
      const s = spinner()
      s.start(`Installing ${pkg}`)
      await addDevDependency(pkg, { silent: true })
      s.stop(`Installed ${pkg}`)
      outro('Please, rerun the command or reopen your editor to apply the changes')
    } else {
      const { ESLint } = await import('eslint')
      const eslint = new ESLint({})
      const config = await eslint.findConfigFile()
      const configMessage = config ? `${underline(relative(currentRoot, config))}` : 'config file'
      if (setting) {
        outro(`Please, install the package or set ${blue(setting)} in your ${configMessage}`)
      } else {
        outro(`Please, install the package or disable the setting in your ${configMessage} file`)
      }
    }
  }
}

export function hasFile (file: string): boolean {
  return existsSync(resolve(process.cwd(), file))
}

export async function getPackageManager () {
  return detect({ cwd: process.cwd() })
}

export { loadAutoImports } from './autoimports'
