// receive RequestModel with url, and remoteIdp name
// call externalDataGateway.fetch(url)
// create RemoteIDp with fetched data (CreateRemoteIdpGateway)
// add TrustRelation entity with remoteIdp and default setup (TRGateway)
// respond with success

import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { AddTrFromMetadataInteractor } from '@sp-proxy/use-cases/AddTrFromMetadataInteractor'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { AddTrFromMetadataUseCaseProps } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseProps'
import { IExternalDataModel } from '@sp-proxy/use-cases/io-models/IExternalDataModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseModel } from '@sp-proxy/use-cases/io-models/SuccessResponseModel'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { IFetchExternalDataGateway } from '@sp-proxy/use-cases/ports/IFetchExternalDataGateway'
import * as crypto from 'crypto'
jest.mock('crypto')

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

const fakeRemoteIdp = new RemoteIdp(
  {
    name: fakeRequest.request.name,
    signingCertificates: ['valid cert'],
    supportedSingleSignOnServices: makeSingleSignOnServices([
      { binding: 'valid binding', location: 'valid location' }
    ])
  },
  'valid uuid'
)

describe('AddTrFromMetadataInteractor', () => {
  beforeAll(async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue('valid uuid')
  })
  it('should call external data gateway fetch', async () => {
    const { sut, fetchExternalDataGatewayStub } = makeSut()
    const fetchSpy = jest.spyOn(fetchExternalDataGatewayStub, 'fetch')
    await sut.execute(fakeRequest)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(fetchSpy).toHaveBeenCalledWith(fakeRequest.request.url)
  })
  it('should call create remoteIdp with fetched data', async () => {
    const { sut, createRemoteIdpGatewayStub } = makeSut()
    const createStub = jest.spyOn(createRemoteIdpGatewayStub, 'create')
    await sut.execute(fakeRequest)
    expect(createStub).toHaveBeenCalledTimes(1)
    expect(createStub).toHaveBeenCalledWith(fakeRemoteIdp)
  })
  it('should call AddTrGateway with TrustRelation entity', async () => {
    const { sut, addTrGatewayStub } = makeSut()
    const expectedTr = new TrustRelation({
      remoteIdp: fakeRemoteIdp,
      singleSignOnService: fakeRemoteIdp.props.supportedSingleSignOnServices[0]
    })
    const addSpy = jest.spyOn(addTrGatewayStub, 'add')
    await sut.execute(fakeRequest)
    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith(expectedTr)
  })
})
