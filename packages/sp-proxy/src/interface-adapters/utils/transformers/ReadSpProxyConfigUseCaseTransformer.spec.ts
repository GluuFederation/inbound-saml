// receive entity
// load certificate
// apply cert formatting
// return rensponse model

import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { ReadSpProxyConfigUseCaseTransformer } from '@sp-proxy/interface-adapters/utils/transformers/ReadSpProxyConfigUseCaseTransformer'
import { IKeyCertLoader } from '@sp-proxy/use-cases/protocols/IKeyCertLoader'
import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'

const makeLoader = (): IKeyCertLoader => {
  class LoaderStub implements IKeyCertLoader {
    async load(path: string): Promise<string> {
      return 'stubbed cert string'
    }
  }
  return new LoaderStub()
}

const makeFormatter = (): IKeyCertFormatter => {
  class FormatterStub implements IKeyCertFormatter {
    async format(keyOrCert: string): Promise<string> {
      return 'stubbed formatted key or cert'
    }
  }
  return new FormatterStub()
}

interface SutTypes {
  sut: ReadSpProxyConfigUseCaseTransformer
  loaderStub: IKeyCertLoader
  formatterStub: IKeyCertFormatter
}

const makeSut = (): SutTypes => {
  const loaderStub = makeLoader()
  const formatterStub = makeFormatter()
  const sut = new ReadSpProxyConfigUseCaseTransformer(loaderStub, formatterStub)
  return { sut, loaderStub, formatterStub }
}

const spProxyConfigProps: SpProxyConfigProps = {
  host: 'fake stubbed host',
  requestedIdentifierFormat: 'fake stubbed identifier format',
  authnContextIdentifierFormat: 'fake stubbed authn context identifier format',
  skipRequestCompression: true,
  decryption: {
    privateKeyPath: 'fake /valid-decryption/pvk/path.pem',
    publicCertPath: 'fake /valid-decryption/cert/path.pem'
  }
}

const fakeSpProxyConfig = new SpProxyConfig(spProxyConfigProps)

const optionalSigning = {
  signing: {
    privateKeyPath: 'fake /valid-signing/pvk/path.pem',
    publicCertPath: 'fake /valid-signing/cert/path.pem'
  }
}
const propsCopy = Object.assign({}, spProxyConfigProps)
const spConfigPropsWithSigning = Object.assign(propsCopy, optionalSigning)

const fakeSpProxyConfigWithSigning = new SpProxyConfig(spConfigPropsWithSigning)

describe('ReadSpProxyConfigUseCaseTransformer', () => {
  it('should call loader with decryption key and cert path', async () => {
    const { sut, loaderStub } = makeSut()
    const loadSpy = jest.spyOn(loaderStub, 'load')
    await sut.transform(fakeSpProxyConfig)
    expect(loadSpy).toHaveBeenCalledTimes(2)
    expect(loadSpy).toHaveBeenCalledWith(
      fakeSpProxyConfig.props.decryption.publicCertPath
    )
    expect(loadSpy).toHaveBeenCalledWith(
      fakeSpProxyConfig.props.decryption.privateKeyPath
    )
  })
  it('should call loader with signing key and cert path', async () => {
    const { sut, loaderStub } = makeSut()
    const loadSpy = jest.spyOn(loaderStub, 'load')
    await sut.transform(fakeSpProxyConfigWithSigning)
    expect(loadSpy).toHaveBeenCalledTimes(4)
    expect(loadSpy).toHaveBeenCalledWith(
      fakeSpProxyConfigWithSigning.props.signing?.publicCertPath
    )
    expect(loadSpy).toHaveBeenCalledWith(
      fakeSpProxyConfigWithSigning.props.signing?.privateKeyPath
    )
  })
  it('should call formatter with loaded decryption cert and key', async () => {
    const { sut, formatterStub, loaderStub } = makeSut()
    const formatSpy = jest.spyOn(formatterStub, 'format')
    jest
      .spyOn(loaderStub, 'load')
      .mockResolvedValueOnce('loaded decryption cert')
      .mockResolvedValueOnce('loaded decryption private key')
    await sut.transform(fakeSpProxyConfig)
    expect(formatSpy).toHaveBeenCalledTimes(2)
    expect(formatSpy).toHaveBeenCalledWith('loaded decryption cert')
    expect(formatSpy).toHaveBeenCalledWith('loaded decryption private key')
  })
  it('should call formatter with loaded signing cert and key', async () => {
    const { sut, formatterStub, loaderStub } = makeSut()
    const formatSpy = jest.spyOn(formatterStub, 'format')
    jest
      .spyOn(loaderStub, 'load')
      .mockResolvedValueOnce('loaded signing cert')
      .mockResolvedValueOnce('loaded signing private key')
    await sut.transform(fakeSpProxyConfigWithSigning)
    expect(formatSpy).toHaveBeenCalledTimes(4)
    expect(formatSpy).toHaveBeenCalledWith('loaded signing cert')
    expect(formatSpy).toHaveBeenCalledWith('loaded signing private key')
  })
  it('return should contain formatted decryption key and cert', async () => {
    const { formatterStub, sut } = makeSut()
    jest
      .spyOn(formatterStub, 'format')
      .mockResolvedValueOnce('formatted key or cert 1')
      .mockResolvedValueOnce('formatted key or cert 2')
    expect(await sut.transform(fakeSpProxyConfig)).toStrictEqual({
      host: fakeSpProxyConfig.props.host,
      requestedIdentifierFormat:
        fakeSpProxyConfig.props.requestedIdentifierFormat,
      authnContextIdentifierFormat:
        fakeSpProxyConfig.props.authnContextIdentifierFormat,
      skipRequestCompression: fakeSpProxyConfig.props.skipRequestCompression,
      decryption: {
        privateKey: 'formatted key or cert 2',
        cert: 'formatted key or cert 1'
      }
    })
  })
  it('should return params with formatted signing key and cert', async () => {
    const { formatterStub, sut } = makeSut()
    jest
      .spyOn(formatterStub, 'format')
      .mockResolvedValueOnce('formatted key or cert 1')
      .mockResolvedValueOnce('formatted key or cert 2')
      .mockResolvedValueOnce('formatted key or cert 3')
      .mockResolvedValueOnce('formatted key or cert 4')
    expect(await sut.transform(fakeSpProxyConfigWithSigning)).toStrictEqual({
      host: fakeSpProxyConfig.props.host,
      requestedIdentifierFormat:
        fakeSpProxyConfig.props.requestedIdentifierFormat,
      authnContextIdentifierFormat:
        fakeSpProxyConfig.props.authnContextIdentifierFormat,
      skipRequestCompression: fakeSpProxyConfig.props.skipRequestCompression,
      decryption: {
        privateKey: 'formatted key or cert 2',
        cert: 'formatted key or cert 1'
      },
      signing: {
        privateKey: 'formatted key or cert 4',
        cert: 'formatted key or cert 3'
      }
    })
  })
})
