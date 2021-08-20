// load certificates string for each filepaths in configuration props
// format strings to passport config requirements (online, without spaces, etc)

import { IKeyCertLoader } from '@sp-proxy/interface-adapters/protocols/IKeyCertLoader'
import { IKeyCertFormatter } from '@sp-proxy/interface-adapters/protocols/IKeySetFormatter'
import { GenerateMetadataTransformer } from '@sp-proxy/interface-adapters/transformers/GenerateMetadataTransformer'
// import { IMetadataGeneratorParams } from '@sp-proxy/use-cases/ports/IMetadataGenerator'

// const fakeRequestParams: IMetadataGeneratorParams = {
//   host: 'valid hostname',
//   requestedIdentifierFormat: 'valid reqyestedIdentifierFormat',
//   authnContextIdentifierFormat: 'valid authnContextIdentifierFormat',
//   skipRequestCompression: false,
//   decryption: {
//     publicCert: 'valid certificate as string with no spaces',
//     privateKey: 'valid key as string with no spaces'
//   },
//   signing: {
//     publicCert: 'valid certificate as string with no spaces',
//     privateKey: 'valid key as string with no spaces'
//   }
// }

const fakeConfigProps = {
  host: 'valid hostname',
  requestedIdentifierFormat: 'valid reqyestedIdentifierFormat',
  authnContextIdentifierFormat: 'valid authnContextIdentifierFormat',
  skipRequestCompression: false,
  decryption: {
    publicCertPath: '/valid/path/to/decryption/cert.crt',
    privateKeyPath: '/valid/path/to/decryption/private.pem'
  },
  signing: {
    publicCertPath: '/valid/path/to/signing/cert.crt',
    privateKeyPath: '/valid/path/to/signing/private.pem'
  }
}

const makeLoader = (): IKeyCertLoader => {
  class LoaderStub implements IKeyCertLoader {
    async load(path: string): Promise<string> {
      return 'stubbed loaded key or cert'
    }
  }
  return new LoaderStub()
}

const makeFormatter = (): IKeyCertFormatter => {
  class FormatterStub implements IKeyCertFormatter {
    async format(keyOrCert: string): Promise<string> {
      return 'stubbed formated key or cert'
    }
  }
  return new FormatterStub()
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

describe('GenerateMetadataTransfromer', () => {
  it('should call loader for each certificate and key path', async () => {
    const { sut, loaderStub } = makeSut()
    const loadSpy = jest.spyOn(loaderStub, 'load')
    await sut.transform(fakeConfigProps)
    expect(loadSpy).toHaveBeenCalledTimes(4)
    expect(loadSpy).toHaveBeenCalledWith(
      fakeConfigProps.decryption.publicCertPath
    )
    expect(loadSpy).toHaveBeenCalledWith(
      fakeConfigProps.decryption.privateKeyPath
    )
    expect(loadSpy).toHaveBeenCalledWith(fakeConfigProps.signing.publicCertPath)
    expect(loadSpy).toHaveBeenCalledWith(fakeConfigProps.signing.privateKeyPath)
  })
})
