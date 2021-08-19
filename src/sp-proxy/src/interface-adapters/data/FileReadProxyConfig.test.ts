import { FileReadProxyConfig } from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
import cfg from '@sp-proxy/interface-adapters/data/config/env'
import { readFileSync } from 'fs'
jest.mock('@sp-proxy/interface-adapters/data/config/env')
describe('FileReadProxyConfig - integration', () => {
  beforeAll(async () => {
    cfg.database.file.proxyConfigPath =
      process.cwd() + '/src/testdata/sp-proxy-config-test.json'
  })
  it('should return configuration entity w/ same props as file', async () => {
    // create expected props 4 comparing
    const expectedProps = JSON.parse(
      readFileSync(cfg.database.file.proxyConfigPath).toString()
    )
    const sut = new FileReadProxyConfig()
    const entity = await sut.read()
    expect(entity.props).toStrictEqual(expectedProps)
  })
})
