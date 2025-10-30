export interface BasePackageJson {
  name: string
  version: string
  description?: string
  license?: string
  repository?: string
  bugs?: string
  homepage?: string
  scripts?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
}
