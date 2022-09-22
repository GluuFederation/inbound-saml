import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { KeyCertLoader } from '@sp-proxy/interface-adapters/external-services/KeyCertLoader'
import { GenerateMetadataFormatter } from '@sp-proxy/interface-adapters/utils/formatters/GenerateMetadataFormatter'
import { GenerateMetadataTransformer } from '@sp-proxy/interface-adapters/utils/transformers/GenerateMetadataTransformer'
import { IMetadataGeneratorParams } from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { IKeyCertLoader } from '@sp-proxy/use-cases/protocols/IKeyCertLoader'
import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'
import { readFileSync } from 'fs'

const makeLoader = (): IKeyCertLoader => {
  return new KeyCertLoader()
}

const makeFormatter = (): IKeyCertFormatter => {
  return new GenerateMetadataFormatter()
}

interface SutTypes {
  sut: GenerateMetadataTransformer
  loaderStub: IKeyCertLoader
  formatterStub: IKeyCertFormatter
}

const makeSut = (): SutTypes => {
  const loaderStub = makeLoader()
  const formatterStub = makeFormatter()
  const sut = new GenerateMetadataTransformer(loaderStub, formatterStub)
  return {
    sut,
    loaderStub,
    formatterStub
  }
}

const fakeConfigProps: SpProxyConfigProps = {
  host: 'myhost.name',
  requestedIdentifierFormat: 'valid:reqyested:identifier:format',
  authnContextIdentifierFormat: 'valid:authnContext:identifier:format',
  skipRequestCompression: false,
  decryption: {
    publicCertPath: process.cwd() + '/packages/testdata/decryptionCert.pem',
    privateKeyPath: process.cwd() + '/packages/testdata/decryptionPvk.key'
  },
  signing: {
    publicCertPath: process.cwd() + '/packages/testdata/cert.pem',
    privateKeyPath: process.cwd() + '/packages/testdata/key.pem'
  },
  postProfileUrl: 'https://valid.url/path'
}

interface KeyCertType {
  publicCert: string
  privateKey: string
}

const signingPairPaths = (): KeyCertType => {
  const privateKey = fakeConfigProps.signing?.privateKeyPath
  const publicCert = fakeConfigProps.signing?.publicCertPath
  if (typeof privateKey === 'string' && typeof publicCert === 'string') {
    return {
      publicCert,
      privateKey
    }
  } else {
    // force test to fail
    expect(typeof privateKey).toEqual('string')
    throw new Error('Test error')
  }
}

const expectedResponse: IMetadataGeneratorParams = {
  callbackUrl: 'https://myhost.name/inbound-saml/sp/callback',
  requestedIdentifierFormat: 'valid:reqyested:identifier:format',
  authnContextIdentifierFormat: 'valid:authnContext:identifier:format',
  skipRequestCompression: false,
  decryption: {
    publicCert: readFileSync(
      fakeConfigProps.decryption.publicCertPath
    ).toString(),
    privateKey: readFileSync(
      fakeConfigProps.decryption.privateKeyPath
    ).toString()
  },
  signing: {
    publicCert: readFileSync(signingPairPaths().publicCert).toString(),
    privateKey: readFileSync(signingPairPaths().privateKey).toString()
  }
}

describe('GenerateMetadataTransformer - integration', () => {
  it('should return correct values', async () => {
    const { sut } = makeSut()
    const result = await sut.transform(fakeConfigProps)
    expect(result).toEqual(expectedResponse)
  })
})
