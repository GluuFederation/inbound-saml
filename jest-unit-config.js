// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestConfig = require('./jest.config')
jestConfig.testMatch = ['**/*.spec.ts']
module.exports = jestConfig
