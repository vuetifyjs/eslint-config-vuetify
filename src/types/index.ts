import type { Linter } from 'eslint'
import type { RuleOptions } from '../typegen'

interface Rules extends RuleOptions {}

export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  plugins?: Record<string, any>
}

export type Awaitable<T> = T | Promise<T>

export type Arrayable<T> = T | T[]

export * from './package'
