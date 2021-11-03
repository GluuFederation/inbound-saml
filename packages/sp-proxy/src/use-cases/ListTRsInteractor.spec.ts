// receive list TR request model
// call gateway's findAll() that return list of entities
// map entity 2 response model
// call output channel (presenter) with response model

import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { makeRemoteIdpUseCaseStub } from './mocks/remoteIdpUseCaseStub'
import { internet } from 'faker'
import { SingleSignOnService } from '@sp-proxy/entities/value-objects/SingleSignOnServices'
import { IListTRsGateway } from './ports/IListTRsGateway'
import { ListTRsInteractor } from './ListTRsInteractor'
import { IMapper } from './protocols/IMapper'
import { ListTRsResponseUseCaseParams } from './io-models/ListTRsResponseUseCaseParams'
import { OutputBoundary } from './ports/OutputBoundary'
import { IResponseModel } from './io-models/IResponseModel'
import { IRequestModel } from './io-models/IRequestModel'
import { ListTRsRequestUseCaseParams } from './io-models/ListTRsRequestUseCaseParams'

const singleSignOnServices: SingleSignOnService[] = [
  makeSingleSignOnService({
    binding: 'a valid redirect binding',
    location: 'valid location 1'
  }),
  makeSingleSignOnService({
    binding: 'a valid post binding',
    location: 'valid location 2'
  })
]

const makeFakeRemoteIdpProps = (): IRemoteIdpProps => {
  const props: IRemoteIdpProps = {
    name: internet.domainName(),
    supportedSingleSignOnServices: singleSignOnServices,
    signingCertificates: ['cert 1', 'cert 2']
  }
  return props
}

const makeFakeTrustRelation = (): TrustRelation => {
  const fakeTrustRelationProps: ITrustRelationProps = {
    remoteIdp: makeRemoteIdpUseCaseStub(undefined, makeFakeRemoteIdpProps()),
    singleSignOnService: singleSignOnServices[0]
  }
  return new TrustRelation(fakeTrustRelationProps)
}

const fakeTrustRelationList = (itemsCount: number = 3): TrustRelation[] => {
  const theList = []
  for (let i = 0; i < itemsCount; i++) {
    theList.push(makeFakeTrustRelation())
  }
  return theList
}

const makeGatewayStub = (): IListTRsGateway => {
  class GatewayStub implements IListTRsGateway {
    async findAll(): Promise<TrustRelation[]> {
      return fakeTrustRelationList()
    }
  }
  return new GatewayStub()
}

const makeMapperStub = (): IMapper<
  TrustRelation[],
  IResponseModel<ListTRsResponseUseCaseParams>
> => {
  class MapperStub
    implements
      IMapper<TrustRelation[], IResponseModel<ListTRsResponseUseCaseParams>>
  {
    map(
      trustRelations: TrustRelation[]
    ): IResponseModel<ListTRsResponseUseCaseParams> {
      return {
        requestId: 'mapped requestId',
        response: [
          {
            id: 'valid mapped id',
            remoteIdp: {
              id: 'mapped remoteIdp id',
              name: 'mapped remoteIdp name',
              metadataEndpoint: 'mapped remoteIdp metadata endpoint',
              singleSignOnService: [
                {
                  binding: 'mapped remoteIdp binding',
                  location: 'mapped remoteIdp location'
                }
              ],
              signingCertificates: ['cert 1', 'cert 2']
            },
            selectedSsoService: {
              binding: 'valid mapped binding',
              location: 'valid mapped location'
            }
          }
        ]
      }
    }
  }
  return new MapperStub()
}

const makePresenterStub = (): OutputBoundary<
  IResponseModel<ListTRsResponseUseCaseParams>
> => {
  class PresenterStub
    implements OutputBoundary<IResponseModel<ListTRsResponseUseCaseParams>>
  {
    async present(
      response: IResponseModel<ListTRsResponseUseCaseParams>
    ): Promise<void> {
      // do something...
    }
  }
  return new PresenterStub()
}

interface SutTypes {
  gatewayStub: IListTRsGateway
  mapperStub: IMapper<
    TrustRelation[],
    IResponseModel<ListTRsResponseUseCaseParams>
  >
  presenterStub: OutputBoundary<IResponseModel<ListTRsResponseUseCaseParams>>
  sut: ListTRsInteractor
}

const makeSut = (): SutTypes => {
  const gatewayStub = makeGatewayStub()
  const mapperStub = makeMapperStub()
  const presenterStub = makePresenterStub()
  const sut = new ListTRsInteractor(gatewayStub, mapperStub, presenterStub)
  return {
    gatewayStub,
    mapperStub,
    presenterStub,
    sut
  }
}

const fakeRequestModel: IRequestModel<ListTRsRequestUseCaseParams> = {
  requestId: 'fakeRequestId',
  request: null
}
describe('ListTRsInteractor', () => {
  it('should call gateway findAll with no params', async () => {
    const { gatewayStub, sut } = makeSut()
    const findAllSpy = jest.spyOn(gatewayStub, 'findAll')
    await sut.execute(fakeRequestModel)
    expect(findAllSpy).toHaveBeenCalledTimes(1)
    expect(findAllSpy).toHaveBeenCalledWith()
  })
  it('should call mapper with received entities', async () => {
    const { gatewayStub, sut, mapperStub } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    jest
      .spyOn(gatewayStub, 'findAll')
      .mockResolvedValueOnce('valid entities list' as any)
    await sut.execute(fakeRequestModel)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith('valid entities list')
  })
  it('should call presenter with response model', async () => {
    const { mapperStub, sut, presenterStub } = makeSut()
    const presentSpy = jest.spyOn(presenterStub, 'present')
    jest
      .spyOn(mapperStub, 'map')
      .mockReturnValueOnce('valid responseModel' as any)
    await sut.execute(fakeRequestModel)
    expect(presentSpy).toHaveBeenCalledTimes(1)
    expect(presentSpy).toHaveBeenCalledWith('valid responseModel')
  })
  it('should throw if gateway throws', async () => {
    const { sut, gatewayStub } = makeSut()
    jest.spyOn(gatewayStub, 'findAll').mockImplementationOnce(() => {
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
})
