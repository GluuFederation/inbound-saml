import { MetadataGenerator } from '@sp-proxy/interface-adapters/external-services/MetadataGenerator'
import { IMetadataGeneratorParams } from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { readFileSync } from 'fs'

const loadedCert = readFileSync(process.cwd() + '/src/testdata/cert.pem')
  .toString()
  .replace(/(\r\n|\n|\r)/gm, '')
  .replace('-----BEGIN CERTIFICATE-----', '')
  .replace('-----END CERTIFICATE-----', '')
const loadedPvk = readFileSync(process.cwd() + '/src/testdata/key.pem')
  .toString()
  .replace(/(\r\n|\n|\r)/gm, '')
  .replace('-----BEGIN ENCRYPTED PRIVATE KEY-----', '')
  .replace('-----END ENCRYPTED PRIVATE KEY-----', '')

const validRequest: IMetadataGeneratorParams = {
  callbackUrl: 'https://my.super.cool/callback',
  requestedIdentifierFormat: 'a:valid:identifier:format',
  authnContextIdentifierFormat: 'a:valid:authn:name:identifier:format',
  skipRequestCompression: false,
  decryption: {
    publicCert: loadedCert,
    privateKey: loadedPvk
  },
  signing: {
    publicCert: loadedCert,
    privateKey: loadedPvk
  }
}
describe('Metadatagenerator - integration', () => {
  it('response should contain cert', async () => {
    const sut = new MetadataGenerator()
    const result = await sut.generate(validRequest)
    expect(result).toContain(loadedCert)
  })
})
