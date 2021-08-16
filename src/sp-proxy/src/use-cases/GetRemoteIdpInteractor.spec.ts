import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { GetRemoteIdpInteractor } from '@sp-proxy/use-cases/GetRemoteIdpInteractor'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { GetRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/GetRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'
import { makeRemoteIdpUseCaseStub } from '@sp-proxy/use-cases/mocks/remoteIdpUseCaseStub'
import { IGetRemoteIdpGateway } from '@sp-proxy/use-cases/ports/IGetRemoteIdpGateway'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

// Receives request w/ IRequestModel
// Calls gateway get w/ entity id
// maps entity to response model
// calls output channel (presenter) with response model

const makePresenter = (): OutputBoundary<RemoteIdpUseCaseProps> => {
  class PresenterStub implements OutputBoundary<RemoteIdpUseCaseProps> {
    async present(
      response: IResponseModel<RemoteIdpUseCaseProps>
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

const makeEntityMapper = (): IMapper<IResponseModel<RemoteIdpUseCaseProps>> => {
  class EntityMapperStub
    implements IMapper<IResponseModel<RemoteIdpUseCaseProps>>
  {
    map(
      requestModel: IRequestModel<any>
    ): IResponseModel<RemoteIdpUseCaseProps> {
      return {
        requestId: 'valid request id',
        response: {
          name: 'valid name',
          singleSignOnService: [
            { binding: 'valid binding', location: 'valid location' }
          ],
          signingCertificates: ['valid cert 1', 'valid cert 2']
        }
      }
    }
  }
  return new EntityMapperStub()
}

interface SutTypes {
  gatewayStub: IGetRemoteIdpGateway
  entityMapperStub: IMapper<IResponseModel<RemoteIdpUseCaseProps>>
  presenterStub: OutputBoundary<RemoteIdpUseCaseProps>
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

const fakeRequest: IRequestModel<GetRemoteIdpRequestModel> = {
  requestId: 'valid request id',
  request: {
    id: 'valid entity id'
  }
}

describe('GetRemoteIdpInteractor', () => {
  it('should call gateway.get once w/ entity id', async () => {
    const { sut, gatewayStub } = makeSut()
    const getSpy = jest.spyOn(gatewayStub, 'get')
    await sut.execute(fakeRequest)
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledWith(fakeRequest.request.id)
  })
})
