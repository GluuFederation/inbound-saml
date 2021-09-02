// const common = [
//   `--format ${
//     process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
//   }`,
//   // '--format json:./reports/cucumber-json-reports/report.json',
//   '--format rerun:@rerun.txt',
//   '--format usage:usage.txt',
//   '--parallel 20',
//   '--require ./src/sp-proxy/features/step_definitions/*.js',
//   '--require ./src/get-saml-metadata/features/step_definitions/*.js',
//   '--require ./dist/sp-proxy/src/frameworks-drivers/main/server.js'
// ].join(' ')

// module.exports = {
//   default: common
// }

module.exports = {
  default: [
    '--require-module tsconfig-paths/register',
    '--require-module ts-node/register',
    '--require ./packages/get-saml-metadata/features/step_definitions/*.js',
    '--require ./packages/sp-proxy/features/step_definitions/*.js'
  ].join(' ')
}
