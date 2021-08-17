// receive RequestModel with url, and remoteIdp name
// call externalDataGateway.fetch(url)
// create RemoteIDp with fetched data (CreateRemoteIdpGateway)
// add TrustRelation entity with remoteIdp and default setup (TRGateway)
// respond with success

import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { AddTrFromMetadataInteractor } from '@sp-proxy/use-cases/AddTrFromMetadataInteractor'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { AddTrFromMetadataUseCaseProps } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseProps'
import { IExternalDataModel } from '@sp-proxy/use-cases/io-models/IExternalDataModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseModel } from '@sp-proxy/use-cases/io-models/SuccessResponseModel'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { IFetchExternalDataGateway } from '@sp-proxy/use-cases/ports/IFetchExternalDataGateway'

const makeFetchExternalDataGateway = (): IFetchExternalDataGateway => {
  class FetchExternalDataStub implements IFetchExternalDataGateway {
    async fetch(url: string): Promise<IExternalDataModel> {
      return {
        idpSigningCert: ['valid cert'],
        singleSignOnServices: [
          { binding: 'valid binding', location: 'valid location' }
        ]
      }
    }
  }
  return new FetchExternalDataStub()
}
const makeCreateRemoteIdpGateway = (): ICreateRemoteIdpGateway => {
  class CreateRemoteIdpStub implements ICreateRemoteIdpGateway {
    async create(remoteIdp: RemoteIdp): Promise<boolean> {
      return true
    }
  }
  return new CreateRemoteIdpStub()
}

const makeAddTrGateway = (): IAddTrGateway => {
  class AddTrStub implements IAddTrGateway {
    async add(trustRelation: TrustRelation): Promise<boolean> {
      return true
    }
  }
  return new AddTrStub()
}

const makePresenter = (): OutputBoundary<
  IResponseModel<SuccessResponseModel>
> => {
  class PresenterStub
    implements OutputBoundary<IResponseModel<SuccessResponseModel>>
  {
    async present(
      response: IResponseModel<SuccessResponseModel>
    ): Promise<void> {
      // do something
    }
  }
  return new PresenterStub()
}

interface SutTypes {
  sut: AddTrFromMetadataInteractor
  fetchExternalDataGatewayStub: IFetchExternalDataGateway
  createRemoteIdpGatewayStub: ICreateRemoteIdpGateway
  addTrGatewayStub: IAddTrGateway
  presenterStub: OutputBoundary<IResponseModel<SuccessResponseModel>>
}

const makeSut = (): SutTypes => {
  const fetchExternalDataGatewayStub = makeFetchExternalDataGateway()
  const createRemoteIdpGatewayStub = makeCreateRemoteIdpGateway()
  const addTrGatewayStub = makeAddTrGateway()
  const presenterStub = makePresenter()
  const sut = new AddTrFromMetadataInteractor(
    fetchExternalDataGatewayStub,
    createRemoteIdpGatewayStub,
    addTrGatewayStub,
    presenterStub
  )
  return {
    sut,
    fetchExternalDataGatewayStub,
    createRemoteIdpGatewayStub,
    addTrGatewayStub,
    presenterStub
  }
}

const fakeRequest: IRequestModel<AddTrFromMetadataUseCaseProps> = {
  requestId: 'valid request id',
  request: {
    url: 'valid url',
    name: 'valid remote idp name'
  }
}

describe('AddTrFromMetadataInteractor', () => {
  it('should call external data gateway fetch', async () => {
    const { sut, fetchExternalDataGatewayStub } = makeSut()
    const fetchSpy = jest.spyOn(fetchExternalDataGatewayStub, 'fetch')
    await sut.execute(fakeRequest)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(fetchSpy).toHaveBeenCalledWith(fakeRequest.request.url)
  })
})
