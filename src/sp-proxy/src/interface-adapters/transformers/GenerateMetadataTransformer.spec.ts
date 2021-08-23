// load certificates string for each filepaths in configuration props
// format strings to passport config requirements (online, without spaces, etc)

import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
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
  }
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
  it('should call formatter for each cert/key received from loader', async () => {
    const { sut, loaderStub, formatterStub } = makeSut()
    const formatSpy = jest.spyOn(formatterStub, 'format')
    jest
      .spyOn(loaderStub, 'load')
      .mockResolvedValueOnce('loaded mocked value 1')
      .mockResolvedValueOnce('loaded mocked value 2')
      .mockResolvedValueOnce('loaded mocked value 3')
      .mockResolvedValueOnce('loaded mocked value 4')
    await sut.transform(fakeConfigProps)
    expect(formatSpy).toHaveBeenCalledTimes(4)
    expect(formatSpy).toHaveBeenCalledWith('loaded mocked value 1')
    expect(formatSpy).toHaveBeenCalledWith('loaded mocked value 2')
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
  it('should call formatter 2 times no signing', async () => {
    const propsCopy = Object.assign({}, fakeConfigProps)
    delete propsCopy.signing
    const { sut, formatterStub } = makeSut()
    const formatSpy = jest.spyOn(formatterStub, 'format')
    await sut.transform(propsCopy)
    expect(formatSpy).toHaveBeenCalledTimes(2)
  })
  it('should return params with formatted strings', async () => {
    const { sut, formatterStub } = makeSut()
    const formatedValues = [
      'formated value 1',
      'formated value 2',
      'formated value 3',
      'formated value 4'
    ]
    jest
      .spyOn(formatterStub, 'format')
      .mockResolvedValueOnce(formatedValues[0])
      .mockResolvedValueOnce(formatedValues[1])
      .mockResolvedValueOnce(formatedValues[2])
      .mockResolvedValueOnce(formatedValues[3])

    const result = await sut.transform(fakeConfigProps)
    console.log(result)
    const keyAndCerts = []
    keyAndCerts.push(result.decryption.privateKey)
    keyAndCerts.push(result.decryption.publicCert)
    keyAndCerts.push(result.signing?.privateKey)
    keyAndCerts.push(result.signing?.publicCert)

    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
    expect(keyAndCerts.sort()).toEqual(formatedValues.sort())
  })
})
