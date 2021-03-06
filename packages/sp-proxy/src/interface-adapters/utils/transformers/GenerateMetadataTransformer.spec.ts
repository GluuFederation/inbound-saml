// load certificates string for each filepaths in configuration props
// format strings to passport config requirements (online, without spaces, etc)

import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { IKeyCertLoader } from '@sp-proxy/use-cases/protocols/IKeyCertLoader'
import { GenerateMetadataTransformer } from '@sp-proxy/interface-adapters/utils/transformers/GenerateMetadataTransformer'
import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'

const fakeConfigProps: SpProxyConfigProps = {
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
  },
  postProfileUrl: 'https://valid.postprofile.com/path'
}

const makeLoader = (): IKeyCertLoader => {
  class LoaderStub implements IKeyCertLoader {
    async load(path: string): Promise<string> {
      return `stubbed loaded key or cert for ${path}`
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
    expect(loadSpy).toHaveBeenCalledWith(
      fakeConfigProps.decryption.publicCertPath
    )
    expect(loadSpy).toHaveBeenCalledWith(
      fakeConfigProps.signing?.publicCertPath
    )
    expect(loadSpy).toHaveBeenCalledWith(
      fakeConfigProps.signing?.privateKeyPath
    )
  })
  it('should call formatter for each SIGNING cert/key received from loader', async () => {
    const { sut, loaderStub, formatterStub } = makeSut()
    const formatSpy = jest.spyOn(formatterStub, 'format')
    jest
      .spyOn(loaderStub, 'load')
      .mockResolvedValueOnce('loaded mocked value 1')
      .mockResolvedValueOnce('loaded mocked value 2')
      .mockResolvedValueOnce('loaded mocked value 3')
      .mockResolvedValueOnce('loaded mocked value 4')
    await sut.transform(fakeConfigProps)
    expect(formatSpy).toHaveBeenCalledTimes(2)
    expect(formatSpy).toHaveBeenCalledWith('loaded mocked value 3')
    expect(formatSpy).toHaveBeenCalledWith('loaded mocked value 4')
  })
  it('should call loader 2 times if no signing', async () => {
    const propsCopy = Object.assign({}, fakeConfigProps)
    delete propsCopy.signing
    const { sut, loaderStub } = makeSut()
    const loadspy = jest.spyOn(loaderStub, 'load')
    await sut.transform(propsCopy)
    expect(loadspy).toHaveBeenCalledTimes(2)
  })
  it('should NOT call formatter times if no signing', async () => {
    const propsCopy = Object.assign({}, fakeConfigProps)
    delete propsCopy.signing
    const { sut, formatterStub } = makeSut()
    const formatSpy = jest.spyOn(formatterStub, 'format')
    await sut.transform(propsCopy)
    expect(formatSpy).toHaveBeenCalledTimes(0)
  })
})
