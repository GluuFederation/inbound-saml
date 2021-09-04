import { BaseKeyCertFormatter } from '@sp-proxy/interface-adapters/utils/formatters/BaseKeyCertFormatter'
import { readFileSync } from 'fs'

const loadedCert = readFileSync(
  process.cwd() + '/packages/testdata/cert.pem'
).toString()
const loadedPvk = readFileSync(
  process.cwd() + '/packages/testdata/key.pem'
).toString()

class ConcreteKeyCertFormatter extends BaseKeyCertFormatter {}

describe('GenerateMetadataFormatter - integration', () => {
  it('should return correct pvk', async () => {
    const sut = new ConcreteKeyCertFormatter()
    const expected = loadedPvk
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace('-----END ENCRYPTED PRIVATE KEY-----', '')
      .replace('-----BEGIN ENCRYPTED PRIVATE KEY-----', '')
    expect(await sut.format(loadedPvk)).toBe(expected)
  })
  it('should return correct cert', async () => {
    const sut = new ConcreteKeyCertFormatter()
    const expected = loadedCert
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace('-----BEGIN CERTIFICATE-----', '')
      .replace('-----END CERTIFICATE-----', '')
    expect(await sut.format(loadedCert)).toBe(expected)
  })
})
