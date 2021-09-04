// receive entity
// load certificate
// apply cert formatting
// return rensponse model

import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { IKeyCertLoader } from '@sp-proxy/use-cases/protocols/IKeyCertLoader'
import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'
import { ReadSpProxyConfigUseCaseTransformer } from '@sp-proxy/use-cases/transformers/ReadSpProxyConfigUseCaseTransformer'

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
})
