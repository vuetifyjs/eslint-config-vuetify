import type { Awaitable } from 'eslint-flat-config-utils'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { isPackageExists } from 'local-pkg'
import { detect } from 'package-manager-detector'

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

export function hasPackage (pkg: string): boolean {
  return isPackageExists(pkg)
}

export function assertPackage (pkg: string): void {
  if (!hasPackage(pkg)) {
    throw new Error(`Package ${pkg} is required`)
  }
}

export function hasFile (file: string): boolean {
  return existsSync(resolve(process.cwd(), file))
}

export async function getPackageManager (){
  return detect({ cwd: process.cwd() })
}

export { loadAutoImports } from './autoimports'
