// receive RequestModel with url, and remoteIdp name
// call externalDataGateway.fetch(url)
// create RemoteIDp with fetched data (CreateRemoteIdpGateway)
// add TrustRelation entity with remoteIdp and default setup (TRGateway)
// respond with success

import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { AddTrFromMetadataInteractor } from '@sp-proxy/use-cases/AddTrFromMetadataInteractor'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { RemoteIdpFromExternalParams } from '@sp-proxy/use-cases/factories/RemoteIdpFromExternalDataFactory'
import { TrustRelationWithDefaultsParams } from '@sp-proxy/use-cases/factories/TrustRelationWithDefaultFactory'
import { OutputBoundary } from '@sp-proxy/use-cases/protocols/OutputBoundary'
import { AddTrFromMetadataUseCaseParams } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseParams'
import { ExternalUseCaseParams } from '@sp-proxy/use-cases/io-models/ExternalUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/SuccessResponseUseCaseParams'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { IFetchExternalDataGateway } from '@sp-proxy/use-cases/ports/IFetchExternalDataGateway'
import { IFactory } from '@sp-proxy/use-cases/protocols/IFactory'

const makeFetchExternalDataGateway = (): IFetchExternalDataGateway => {
  class FetchExternalDataStub implements IFetchExternalDataGateway {
    async fetch(url: string): Promise<ExternalUseCaseParams> {
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
  IResponseModel<SuccessResponseUseCaseParams>
> => {
  class PresenterStub
    implements OutputBoundary<IResponseModel<SuccessResponseUseCaseParams>>
  {
    async present(
      response: IResponseModel<SuccessResponseUseCaseParams>
    ): Promise<void> {
      // do something
    }
  }
  return new PresenterStub()
}

const makeRemoteIdpFactory = (): IFactory<
  RemoteIdpFromExternalParams,
  RemoteIdp
> => {
  class RemoteIdpFactoryStub
    implements IFactory<RemoteIdpFromExternalParams, RemoteIdp>
  {
    async make(props: RemoteIdpFromExternalParams): Promise<RemoteIdp> {
      return new RemoteIdp({
        name: 'any vaid remote idp name',
        signingCertificates: ['any valid certificate'],
        supportedSingleSignOnServices: makeSingleSignOnServices([
          { binding: 'a valid binding', location: 'a valid location' }
        ])
      })
    }
  }
  return new RemoteIdpFactoryStub()
}

const makeTrustRelationFactory = (): IFactory<
  TrustRelationWithDefaultsParams,
  TrustRelation
> => {
  class TrustRelationFactoryStub
    implements IFactory<TrustRelationWithDefaultsParams, TrustRelation>
  {
    async make(props: TrustRelationWithDefaultsParams): Promise<TrustRelation> {
      const factory = makeRemoteIdpFactory()
      return new TrustRelation({
        remoteIdp: await factory.make('props' as any),
        singleSignOnService: makeSingleSignOnService(
          props.remoteIdp.props.supportedSingleSignOnServices[0].props
        )
      })
    }
  }
  return new TrustRelationFactoryStub()
}

interface SutTypes {
  sut: AddTrFromMetadataInteractor
  fetchExternalDataGatewayStub: IFetchExternalDataGateway
  remoteIdpFromDataStub: IFactory<RemoteIdpFromExternalParams, RemoteIdp>
  createRemoteIdpGatewayStub: ICreateRemoteIdpGateway
  trustRelationFactoryStub: IFactory<
    TrustRelationWithDefaultsParams,
    TrustRelation
  >
  addTrGatewayStub: IAddTrGateway
  presenterStub: OutputBoundary<IResponseModel<SuccessResponseUseCaseParams>>
}

const makeSut = (): SutTypes => {
  const fetchExternalDataGatewayStub = makeFetchExternalDataGateway()
  const remoteIdpFromDataStub = makeRemoteIdpFactory()
  const createRemoteIdpGatewayStub = makeCreateRemoteIdpGateway()
  const trustRelationFactoryStub = makeTrustRelationFactory()
  const addTrGatewayStub = makeAddTrGateway()
  const presenterStub = makePresenter()
  const sut = new AddTrFromMetadataInteractor(
    fetchExternalDataGatewayStub,
    remoteIdpFromDataStub,
    createRemoteIdpGatewayStub,
    trustRelationFactoryStub,
    addTrGatewayStub,
    presenterStub
  )
  return {
    sut,
    fetchExternalDataGatewayStub,
    remoteIdpFromDataStub,
    createRemoteIdpGatewayStub,
    trustRelationFactoryStub,
    addTrGatewayStub,
    presenterStub
  }
}

const fakeRequest: IRequestModel<AddTrFromMetadataUseCaseParams> = {
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
  it('should call external data gateway fetch', async () => {
    const { sut, fetchExternalDataGatewayStub } = makeSut()
    const fetchSpy = jest.spyOn(fetchExternalDataGatewayStub, 'fetch')
    await sut.execute(fakeRequest)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(fetchSpy).toHaveBeenCalledWith(fakeRequest.request.url)
  })
  it('should call remoteIdp factory with fetched data', async () => {
    const { sut, remoteIdpFromDataStub, fetchExternalDataGatewayStub } =
      makeSut()
    const fetchedDataMock: ExternalUseCaseParams = {
      idpSigningCert: ['valid cert'],
      singleSignOnServices: [
        { binding: 'any valid binding', location: 'any valid location' }
      ]
    }
    const makeSpy = jest.spyOn(remoteIdpFromDataStub, 'make')
    jest
      .spyOn(fetchExternalDataGatewayStub, 'fetch')
      .mockResolvedValueOnce(fetchedDataMock)
    await sut.execute(fakeRequest)
    expect(makeSpy).toHaveBeenCalledTimes(1)
  })
  it('should call remoteidp gateway create with object returned from remoteIdpFactory', async () => {
    const { sut, remoteIdpFromDataStub, createRemoteIdpGatewayStub } = makeSut()
    const createSpy = jest.spyOn(createRemoteIdpGatewayStub, 'create')
    jest
      .spyOn(remoteIdpFromDataStub, 'make')
      .mockResolvedValueOnce(fakeRemoteIdp)
    await sut.execute(fakeRequest)
    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledWith(fakeRemoteIdp)
  })
  it('should call TrustRelationFactory with remote Idp returned by remoteIdpFactory', async () => {
    const { sut, remoteIdpFromDataStub, trustRelationFactoryStub } = makeSut()
    const makeSpy = jest.spyOn(trustRelationFactoryStub, 'make')
    jest
      .spyOn(remoteIdpFromDataStub, 'make')
      .mockResolvedValueOnce(fakeRemoteIdp)
    await sut.execute(fakeRequest)
    expect(makeSpy).toHaveBeenCalledTimes(1)
    expect(makeSpy).toHaveBeenCalledWith({ remoteIdp: fakeRemoteIdp })
  })
  it('should call AddTrGateway with value entity returned from TR Factory', async () => {
    const { sut, trustRelationFactoryStub, addTrGatewayStub } = makeSut()
    const addSpy = jest.spyOn(addTrGatewayStub, 'add')
    jest
      .spyOn(trustRelationFactoryStub as any, 'make')
      .mockResolvedValueOnce('any valid TR instance')
    await sut.execute(fakeRequest)
    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith('any valid TR instance')
  })
  it('should call presenter with success', async () => {
    const { sut, presenterStub } = makeSut()
    const presentSpy = jest.spyOn(presenterStub, 'present')
    await sut.execute(fakeRequest)
    expect(presentSpy).toHaveBeenCalledTimes(1)
    const expectedResponseModel: IResponseModel<SuccessResponseUseCaseParams> =
      {
        requestId: fakeRequest.requestId,
        response: {
          success: true
        }
      }
    expect(presentSpy).toHaveBeenCalledWith(expectedResponseModel)
  })
  it('should throw if ExternalData fetching throws', async () => {
    const { sut, fetchExternalDataGatewayStub } = makeSut()
    jest
      .spyOn(fetchExternalDataGatewayStub, 'fetch')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    await expect(sut.execute(fakeRequest)).rejects.toThrow()
  })
  it('should throw if remote idp creation throws', async () => {
    const { sut, createRemoteIdpGatewayStub } = makeSut()
    jest
      .spyOn(createRemoteIdpGatewayStub, 'create')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    await expect(sut.execute(fakeRequest)).rejects.toThrow()
  })
  it('should throw if remoteIdp factory throws', async () => {
    const { sut, remoteIdpFromDataStub } = makeSut()
    jest.spyOn(remoteIdpFromDataStub, 'make').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequest)).rejects.toThrow()
  })
  it('should throw if TrustRelation factory throws', async () => {
    const { sut, trustRelationFactoryStub } = makeSut()
    jest.spyOn(trustRelationFactoryStub, 'make').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequest)).rejects.toThrow()
  })
  it('should throw if AddTrustRelationGateway throws', async () => {
    const { sut, addTrGatewayStub } = makeSut()
    jest.spyOn(addTrGatewayStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequest)).rejects.toThrow()
  })
  it('should throw if presenter throws', async () => {
    const { sut, presenterStub } = makeSut()
    jest.spyOn(presenterStub, 'present').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequest)).rejects.toThrow()
  })
})
