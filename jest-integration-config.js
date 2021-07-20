// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestConfig = require('./jest.config')
jestConfig.testMatch = ['**/*.test.ts']
module.exports = jestConfig
