declare function require(moduleName: string): any

export const environment = {
  VERSION: require('../package.json').version // eslint-disable-line @typescript-eslint/no-var-requires
}
