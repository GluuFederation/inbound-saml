import { GenerateMetadataFormatter } from '@sp-proxy/interface-adapters/utils/formatters/GenerateMetadataFormatter'
import { readFileSync } from 'fs'

const loadedCert = readFileSync(
  process.cwd() + '/packages/testdata/cert.pem'
).toString()
const loadedPvk = readFileSync(
  process.cwd() + '/packages/testdata/key.pem'
).toString()

describe('GenerateMetadataFormatter - integration', () => {
  it('should return correct pvk', async () => {
    const sut = new GenerateMetadataFormatter()
    const expected = loadedPvk
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace('-----END ENCRYPTED PRIVATE KEY-----', '')
      .replace('-----BEGIN ENCRYPTED PRIVATE KEY-----', '')
    expect(await sut.format(loadedPvk)).toBe(expected)
  })
  it('should return correct cert', async () => {
    const sut = new GenerateMetadataFormatter()
    const expected = loadedCert
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace('-----BEGIN CERTIFICATE-----', '')
      .replace('-----END CERTIFICATE-----', '')
    expect(await sut.format(loadedCert)).toBe(expected)
  })
})
