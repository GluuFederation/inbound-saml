import { FileReadProxyConfig } from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
import cfg from '@sp-proxy/interface-adapters/config/env'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
jest.mock('@sp-proxy/interface-adapters/config/env')
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
  it('should throw PersistenceError if invalid path', async () => {
    cfg.database.file.proxyConfigPath = 'invalidpath' + randomUUID()
    const sut = new FileReadProxyConfig()
    await expect(sut.read()).rejects.toThrow(PersistenceError)
  })
})
