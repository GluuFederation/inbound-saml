import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { GetRemoteIdpInteractor } from '@sp-proxy/use-cases/GetRemoteIdpInteractor'
import { OutputBoundary } from '@sp-proxy/use-cases/protocols/OutputBoundary'
import { GetRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/GetRemoteIdpUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'
import { makeRemoteIdpUseCaseStub } from '@sp-proxy/use-cases/mocks/remoteIdpUseCaseStub'
import { IGetRemoteIdpGateway } from '@sp-proxy/use-cases/ports/IGetRemoteIdpGateway'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

// Receives request w/ IRequestModel
// Calls gateway get w/ entity id
// maps entity to response model
// calls output channel (presenter) with response model

const makePresenter = (): OutputBoundary<
  IResponseModel<RemoteIdpUseCaseParams>
> => {
  class PresenterStub
    implements OutputBoundary<IResponseModel<RemoteIdpUseCaseParams>>
  {
    async present(
      response: IResponseModel<RemoteIdpUseCaseParams>
    ): Promise<void> {
      // do something...
    }
  }
  return new PresenterStub()
}

const makeGateway = (): IGetRemoteIdpGateway => {
  class GatewayStub implements IGetRemoteIdpGateway {
    // will always return a stub with the same id sent to get method
    async get(id: string): Promise<RemoteIdp> {
      return makeRemoteIdpUseCaseStub(id)
    }
  }
  return new GatewayStub()
}

const makeEntityMapper = (): IMapper<RemoteIdp, RemoteIdpUseCaseParams> => {
  class EntityMapperStub implements IMapper<RemoteIdp, RemoteIdpUseCaseParams> {
    map(entity: RemoteIdp): RemoteIdpUseCaseParams {
      return {
        id: 'valid entity id',
        name: 'valid name',
        singleSignOnService: [
          { binding: 'valid binding', location: 'valid location' }
        ],
        signingCertificates: ['valid cert 1', 'valid cert 2']
      }
    }
  }
  return new EntityMapperStub()
}

interface SutTypes {
  gatewayStub: IGetRemoteIdpGateway
  entityMapperStub: IMapper<RemoteIdp, RemoteIdpUseCaseParams>
  presenterStub: OutputBoundary<IResponseModel<RemoteIdpUseCaseParams>>
  sut: GetRemoteIdpInteractor
}

const makeSut = (): SutTypes => {
  const gatewayStub = makeGateway()
  const presenterStub = makePresenter()
  const entityMapperStub = makeEntityMapper()
  const sut = new GetRemoteIdpInteractor(
    gatewayStub,
    presenterStub,
    entityMapperStub
  )
  return {
    gatewayStub,
    entityMapperStub,
    presenterStub,
    sut
  }
}

const fakeRequestDto: IRequestModel<GetRemoteIdpUseCaseParams> = {
  requestId: 'valid request id',
  request: {
    id: 'valid entity id'
  }
}

describe('GetRemoteIdpInteractor', () => {
  it('should call gateway.get once w/ entity id', async () => {
    const { sut, gatewayStub } = makeSut()
    const getSpy = jest.spyOn(gatewayStub, 'get')
    await sut.execute(fakeRequestDto)
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledWith(fakeRequestDto.request.id)
  })
  it('should throw if gateway throws', async () => {
    const { sut, gatewayStub } = makeSut()
    jest.spyOn(gatewayStub, 'get').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequestDto)).rejects.toThrow()
  })
  it('should call mapper with same entity returned from gateway', async () => {
    const { sut, entityMapperStub, gatewayStub } = makeSut()
    const mapSpy = jest.spyOn(entityMapperStub, 'map')
    const entityMock = makeRemoteIdpUseCaseStub('valid id for this test')
    jest
      .spyOn(gatewayStub, 'get')
      .mockResolvedValueOnce(makeRemoteIdpUseCaseStub('valid id for this test'))
    await sut.execute(fakeRequestDto)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(entityMock)
  })
  it('should throw if mapper throws', async () => {
    const { sut, entityMapperStub } = makeSut()
    jest.spyOn(entityMapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequestDto)).rejects.toThrow()
  })
  it('should call presenter with mapped response model', async () => {
    const { sut, presenterStub, entityMapperStub } = makeSut()
    const responseModelMock: IResponseModel<RemoteIdpUseCaseParams> = {
      requestId: 'valid request id',
      response: {
        id: 'vakud entity id',
        name: 'valid entity name for this test',
        singleSignOnService: [
          {
            binding: 'valid binding',
            location: 'valid location'
          }
        ],
        signingCertificates: ['valid cert']
      }
    }
    jest
      .spyOn(entityMapperStub, 'map')
      .mockReturnValueOnce(responseModelMock.response)
    const presentSpy = jest.spyOn(presenterStub, 'present')
    await sut.execute(fakeRequestDto)
    expect(presentSpy).toHaveBeenCalledTimes(1)
    expect(presentSpy).toHaveBeenCalledWith(responseModelMock)
  })
  it('should throw if presenter throws', async () => {
    const { sut, presenterStub } = makeSut()
    jest.spyOn(presenterStub, 'present').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequestDto)).rejects.toThrow()
  })
})
