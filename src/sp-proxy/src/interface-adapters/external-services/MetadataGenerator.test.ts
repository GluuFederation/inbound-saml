import { MetadataGenerator } from '@sp-proxy/interface-adapters/external-services/MetadataGenerator'
import { IMetadataGeneratorParams } from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { readFileSync } from 'fs'

const loadedCert = readFileSync(
  process.cwd() + '/src/testdata/cert.pem'
).toString()
const loadedPvk = readFileSync(
  process.cwd() + '/src/testdata/key.pem'
).toString()

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
  it('should return expected value', async () => {
    const sut = new MetadataGenerator()
    console.log(await sut.generate(validRequest))
  })
})
