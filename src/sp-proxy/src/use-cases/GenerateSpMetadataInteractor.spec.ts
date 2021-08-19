// receive request model
// read/get proxy config entity (gateway)
// delegates to EXTERNAL api to generate Metadata
// maps Xmldata to response model

import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { GenerateSpMetadataInteractor } from '@sp-proxy/use-cases/GenerateMetadataInteractor'
import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataResponseUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { IMetadataGenerator } from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { IReadProxyConfigGateway } from '@sp-proxy/use-cases/ports/IReadProxyConfigGateway'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { CertKeySetType } from '@sp-proxy/use-cases/protocols/CertKeySetType'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { IXmlData } from '@sp-proxy/use-cases/protocols/IXmlData'

// present response model with generated metadata
const makeConfigGateway = (): IReadProxyConfigGateway => {
  class ConfigGatewayStub implements IReadProxyConfigGateway {
    async read(): Promise<SpProxyConfig> {
      const validProps: SpProxyConfigProps = {
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
      return new SpProxyConfig(validProps)
    }
  }
  return new ConfigGatewayStub()
}

const makeMetadataGenerator = (): IMetadataGenerator => {
  class MetadataGeneratorStub implements IMetadataGenerator {
    async generate(
      decryptionKeySet?: CertKeySetType | undefined,
      signingKeySet?: CertKeySetType | undefined
    ): Promise<IXmlData> {
      return 'valid xml mock'
    }
  }
  return new MetadataGeneratorStub()
}

const makeMapper = (): IMapper<
  IXmlData,
  IResponseModel<GenerateMetadataResponseUseCaseParams>
> => {
  class MapperStub
    implements
      IMapper<IXmlData, IResponseModel<GenerateMetadataResponseUseCaseParams>>
  {
    map(
      mappedFrom: IXmlData
    ): IResponseModel<GenerateMetadataResponseUseCaseParams> {
      return {
        requestId: 'valid mapped id',
        response: {
          xmldata: 'valid mapped xml data'
        }
      }
    }
  }
  return new MapperStub()
}

const makePresenter = (): OutputBoundary<
  IResponseModel<GenerateMetadataResponseUseCaseParams>
> => {
  class PresenterStub
    implements
      OutputBoundary<IResponseModel<GenerateMetadataResponseUseCaseParams>>
  {
    async present(
      response: IResponseModel<GenerateMetadataResponseUseCaseParams>
    ): Promise<void> {
      // do something cool
    }
  }
  return new PresenterStub()
}

interface SutTypes {
  sut: GenerateSpMetadataInteractor
  readConfigGatewayStub: IReadProxyConfigGateway
  metadataGeneratorStub: IMetadataGenerator
  mapperStub: IMapper<
    IXmlData,
    IResponseModel<GenerateMetadataResponseUseCaseParams>
  >
  presenterStub: OutputBoundary<
    IResponseModel<GenerateMetadataResponseUseCaseParams>
  >
}

const makeSut = (): SutTypes => {
  const readConfigGatewayStub = makeConfigGateway()
  const metadataGeneratorStub = makeMetadataGenerator()
  const mapperStub = makeMapper()
  const presenterStub = makePresenter()
  const sut = new GenerateSpMetadataInteractor(
    readConfigGatewayStub,
    metadataGeneratorStub,
    mapperStub,
    presenterStub
  )
  return {
    sut,
    readConfigGatewayStub,
    metadataGeneratorStub,
    mapperStub,
    presenterStub
  }
}

const fakeRequestModel: IRequestModel<'GenerateSpMetadata'> = {
  requestId: 'fake valid request id',
  request: 'GenerateSpMetadata'
}

describe('GenerateMetadataInteractor', () => {
  it('should call read proxyConfig gateway once', async () => {
    const { sut, readConfigGatewayStub } = makeSut()
    const readSpy = jest.spyOn(readConfigGatewayStub, 'read')
    await sut.execute(fakeRequestModel)
    expect(readSpy).toHaveBeenCalledTimes(1)
    expect(readSpy).toHaveBeenCalledWith()
  })
})
