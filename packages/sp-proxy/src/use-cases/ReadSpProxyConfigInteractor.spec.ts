// receive request model
// call gateway (repo) read
// TRANSFORM entity to response model (should have formatted key/cert)
// call presenter with response model

import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { ReadSpProxyConfigRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigRequestUseCaseParams'
import { ReadSpProxyConfigResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigResponseUseCaseParams'
import { IReadProxyConfigGateway } from '@sp-proxy/use-cases/ports/IReadProxyConfigGateway'
import { ITransformer } from '@sp-proxy/use-cases/ports/ITransformer'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { ReadSpProxyConfigInteractor } from '@sp-proxy/use-cases/ReadSpProxyConfigInteractor'

const makeGateway = (): IReadProxyConfigGateway => {
  class GatewayStub implements IReadProxyConfigGateway {
    async read(): Promise<SpProxyConfig> {
      const spProxyConfigProps: SpProxyConfigProps = {
        host: 'gtw stubbed host',
        requestedIdentifierFormat: 'gtw stubbed identifier format',
        authnContextIdentifierFormat:
          'gtw stubbed authn context identifier format',
        skipRequestCompression: true,
        decryption: {
          privateKeyPath: 'gtw /valid/pvk/path.pem',
          publicCertPath: 'gtw /valid/cert/path.pem'
        }
      }
      return new SpProxyConfig(spProxyConfigProps)
    }
  }
  return new GatewayStub()
}

const makeTransformer = (): ITransformer<
  SpProxyConfig,
  IResponseModel<ReadSpProxyConfigResponseUseCaseParams>
> => {
  class TransformerStub
    implements
      ITransformer<
        SpProxyConfig,
        IResponseModel<ReadSpProxyConfigResponseUseCaseParams>
      >
  {
    async transform(
      from: SpProxyConfig
    ): Promise<IResponseModel<ReadSpProxyConfigResponseUseCaseParams>> {
      return {
        requestId: 'request id transform stub',
        response: {
          host: 'transform stubbed host',
          requestedIdentifierFormat: 'transform stubbed identifier format',
          authnContextIdentifierFormat:
            'transform stubbed authn context identifier format',
          skipRequestCompression: true,
          decryption: {
            privateKey: 'valid stunbbed pvk string',
            cert: 'valid stubbed cert string'
          }
        }
      }
    }
  }
  return new TransformerStub()
}

const makePresenter =
  (): OutputBoundary<ReadSpProxyConfigResponseUseCaseParams> => {
    class PresenterStub
      implements OutputBoundary<ReadSpProxyConfigResponseUseCaseParams>
    {
      async present(
        response: ReadSpProxyConfigResponseUseCaseParams
      ): Promise<void> {
        // do something
      }
    }
    return new PresenterStub()
  }

interface SutTypes {
  gatewayStub: IReadProxyConfigGateway
  transformerStub: ITransformer<
    SpProxyConfig,
    IResponseModel<ReadSpProxyConfigResponseUseCaseParams>
  >
  presenterStub: OutputBoundary<ReadSpProxyConfigResponseUseCaseParams>
  sut: ReadSpProxyConfigInteractor
}

const makeSut = (): SutTypes => {
  const gatewayStub = makeGateway()
  const transformerStub = makeTransformer()
  const presenterStub = makePresenter()
  const sut = new ReadSpProxyConfigInteractor(
    gatewayStub,
    transformerStub,
    presenterStub
  )
  return {
    gatewayStub,
    transformerStub,
    presenterStub,
    sut
  }
}

const fakeRequestModel: IRequestModel<ReadSpProxyConfigRequestUseCaseParams> = {
  requestId: '',
  request: null
}

describe('ReadSpProxyConfigInteractor', () => {
  it('should call gateway read once with no params', async () => {
    const { gatewayStub, sut } = makeSut()
    const readSpy = jest.spyOn(gatewayStub, 'read')
    await sut.execute(fakeRequestModel)
    expect(readSpy).toHaveBeenCalledTimes(1)
    expect(readSpy).toHaveBeenCalledWith()
  })
  it('should call transformer once with received entity', async () => {
    const { gatewayStub, sut, transformerStub } = makeSut()
    const transformSpy = jest.spyOn(transformerStub, 'transform')
    jest
      .spyOn(gatewayStub, 'read')
      .mockResolvedValueOnce('received entity' as any)
    await sut.execute(fakeRequestModel)
    expect(transformSpy).toHaveBeenCalledTimes(1)
    expect(transformSpy).toHaveBeenCalledWith('received entity')
  })
  it('should throw if gateway thows', async () => {
    const { gatewayStub, sut } = makeSut()
    jest.spyOn(gatewayStub, 'read').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequestModel)).rejects.toThrow()
  })
})
