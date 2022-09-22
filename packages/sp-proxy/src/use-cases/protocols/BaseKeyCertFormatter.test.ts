import { BaseKeyCertFormatter } from '@sp-proxy/use-cases/protocols/BaseKeyCertFormatter'
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
    expect(await sut.format(loadedPvk)).toBe(expected)
  })
  it('should return correct cert', async () => {
    const sut = new ConcreteKeyCertFormatter()
    const expected = loadedCert
    expect(await sut.format(loadedCert)).toBe(expected)
  })
})
