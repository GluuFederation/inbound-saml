// receive request model
// read/get proxy config entity (gateway)
// delegates to EXTERNAL api to generate Metadata
// maps Xmldata to response model
// calls presenter with response model

import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { GenerateSpMetadataInteractor } from '@sp-proxy/use-cases/GenerateMetadataInteractor'
import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataResponseUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import {
  IMetadataGenerator,
  IMetadataGeneratorParams
} from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { IReadProxyConfigGateway } from '@sp-proxy/use-cases/ports/IReadProxyConfigGateway'
import { ITransformer } from '@sp-proxy/use-cases/ports/ITransformer'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { IXmlData } from '@sp-proxy/use-cases/protocols/IXmlData'

// receive requestmodel
// load configuration (repo)
// maps configuration to external generator request model

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

const makeConfigGateway = (): IReadProxyConfigGateway => {
  class ConfigGatewayStub implements IReadProxyConfigGateway {
    async read(): Promise<SpProxyConfig> {
      return new SpProxyConfig(fakeConfigProps)
    }
  }
  return new ConfigGatewayStub()
}

const makeMetadataGenerator = (): IMetadataGenerator => {
  class MetadataGeneratorStub implements IMetadataGenerator {
    async generate(params: IMetadataGeneratorParams): Promise<IXmlData> {
      return 'valid xml mock'
    }
  }
  return new MetadataGeneratorStub()
}

const makeMapper = (): IMapper<
  IXmlData,
  GenerateMetadataResponseUseCaseParams
> => {
  class MapperStub
    implements IMapper<IXmlData, GenerateMetadataResponseUseCaseParams>
  {
    map(mappedFrom: IXmlData): GenerateMetadataResponseUseCaseParams {
      return {
        xmldata: 'valid mapped xml data'
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
  transformerStub: ITransformer<SpProxyConfigProps, IMetadataGeneratorParams>
  metadataGeneratorStub: IMetadataGenerator
  mapperStub: IMapper<IXmlData, GenerateMetadataResponseUseCaseParams>
  presenterStub: OutputBoundary<
    IResponseModel<GenerateMetadataResponseUseCaseParams>
  >
}

const fakeRequestParams: IMetadataGeneratorParams = {
  callbackUrl: 'valid hostname',
  requestedIdentifierFormat: 'valid reqyestedIdentifierFormat',
  authnContextIdentifierFormat: 'valid authnContextIdentifierFormat',
  skipRequestCompression: false,
  decryption: {
    publicCert: 'valid certificate as string with no spaces',
    privateKey: 'valid key as string with no spaces'
  },
  signing: {
    publicCert: 'valid certificate as string with no spaces',
    privateKey: 'valid key as string with no spaces'
  }
}

const makeTransformer = (): ITransformer<
  SpProxyConfigProps,
  IMetadataGeneratorParams
> => {
  class TransformerStub
    implements ITransformer<SpProxyConfigProps, IMetadataGeneratorParams>
  {
    async transform(
      from: SpProxyConfigProps
    ): Promise<IMetadataGeneratorParams> {
      return fakeRequestParams
    }
  }
  return new TransformerStub()
}

const makeSut = (): SutTypes => {
  const readConfigGatewayStub = makeConfigGateway()
  const transformerStub = makeTransformer()
  const metadataGeneratorStub = makeMetadataGenerator()
  const mapperStub = makeMapper()
  const presenterStub = makePresenter()
  const sut = new GenerateSpMetadataInteractor(
    readConfigGatewayStub,
    transformerStub,
    metadataGeneratorStub,
    mapperStub,
    presenterStub
  )
  return {
    sut,
    transformerStub,
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
  it('should call transformer with received config props', async () => {
    const { sut, transformerStub, readConfigGatewayStub } = makeSut()
    const transformSpy = jest.spyOn(transformerStub, 'transform')
    const spProxyConfigMock = new SpProxyConfig(fakeConfigProps)
    jest
      .spyOn(readConfigGatewayStub, 'read')
      .mockResolvedValueOnce(spProxyConfigMock)
    await sut.execute(fakeRequestModel)
    expect(transformSpy).toHaveBeenCalledTimes(1)
    expect(transformSpy).toHaveBeenCalledWith(fakeConfigProps)
  })
  it('should call generator with params received from transformer', async () => {
    const { sut, transformerStub, metadataGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(metadataGeneratorStub, 'generate')
    jest
      .spyOn(transformerStub as any, 'transform')
      .mockResolvedValueOnce('valid mocked params')
    await sut.execute(fakeRequestModel)
    expect(generateSpy).toHaveBeenCalledTimes(1)
    expect(generateSpy).toHaveBeenCalledWith('valid mocked params')
  })
  it('should call mapper with received xmldata', async () => {
    const { sut, metadataGeneratorStub, mapperStub } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    jest
      .spyOn(metadataGeneratorStub, 'generate')
      .mockResolvedValueOnce('valid mocked xml data')
    await sut.execute(fakeRequestModel)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith('valid mocked xml data')
  })
  it('should call presenter with mapped request model', async () => {
    const { sut, mapperStub, presenterStub } = makeSut()
    const presentSpy = jest.spyOn(presenterStub, 'present')
    jest
      .spyOn(mapperStub as any, 'map')
      .mockReturnValueOnce('valid mapped useCase params')
    await sut.execute(fakeRequestModel)
    expect(presentSpy).toHaveBeenCalledTimes(1)
    expect(presentSpy).toHaveBeenCalledWith({
      requestId: fakeRequestModel.requestId,
      response: 'valid mapped useCase params'
    })
  })
  it('should throw if config gateway throws', async () => {
    const { sut, readConfigGatewayStub } = makeSut()
    jest.spyOn(readConfigGatewayStub, 'read').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequestModel)).rejects.toThrow()
  })
  it('should throw if metadata generator throws', async () => {
    const { sut, metadataGeneratorStub } = makeSut()
    jest.spyOn(metadataGeneratorStub, 'generate').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequestModel)).rejects.toThrow()
  })
  it('should throw if mapper throws', async () => {
    const { sut, mapperStub } = makeSut()
    jest.spyOn(mapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequestModel)).rejects.toThrow()
  })
  it('should throw if presenter throws', async () => {
    const { sut, presenterStub } = makeSut()
    jest.spyOn(presenterStub, 'present').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequestModel)).rejects.toThrow()
  })
})
