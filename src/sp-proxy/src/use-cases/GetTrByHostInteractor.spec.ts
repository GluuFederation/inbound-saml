// receive request containing host
// call gateway's (repository) findByHost that returns TR entity
// map entity 2 response model
// calls output channel (presenter)

import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { GetTrByHostInteractor } from '@sp-proxy/use-cases/GetTrByHostInteractor'
import { GetTrByHostRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostRequestUseCaseParams'
import { GetTrByHostResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostResponseUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { makeRemoteIdpUseCaseStub } from '@sp-proxy/use-cases/mocks/remoteIdpUseCaseStub'
import { IGetTrByHostGateway } from '@sp-proxy/use-cases/ports/IGetTrByHostGateway'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

// fake props adding the first SSO Service from RemoteIdp to TR
const fakeTrustRelationProps: ITrustRelationProps = {
  remoteIdp: makeRemoteIdpUseCaseStub(),
  singleSignOnService: makeSingleSignOnService(
    makeRemoteIdpUseCaseStub().props.supportedSingleSignOnServices[0].props
  )
}

const makeGateway = (): IGetTrByHostGateway => {
  class GatewayStub implements IGetTrByHostGateway {
    async findByHost(host: string): Promise<TrustRelation> {
      return new TrustRelation(fakeTrustRelationProps)
    }
  }
  return new GatewayStub()
}

const makeMapper = (): IMapper<
  TrustRelation,
  IResponseModel<GetTrByHostResponseUseCaseParams>
> => {
  class MapperStub
    implements
      IMapper<TrustRelation, IResponseModel<GetTrByHostResponseUseCaseParams>>
  {
    map(
      trustRelation: TrustRelation
    ): IResponseModel<GetTrByHostResponseUseCaseParams> {
      return {
        requestId: 'mapped stubbed request id',
        response: {
          id: 'mapped stubbed TR id',
          selectedSsoService: 'mapped stubbed selected sso service',
          remoteIdp: {
            id: 'valid entity id',
            name: 'valid name',
            singleSignOnService: [
              { binding: 'valid binding', location: 'valid location' }
            ],
            signingCertificates: ['valid cert 1', 'valid cert 2']
          }
        }
      }
    }
  }
  return new MapperStub()
}

const makePresenter = (): OutputBoundary<
  IResponseModel<GetTrByHostResponseUseCaseParams>
> => {
  class PresenterStub
    implements OutputBoundary<IResponseModel<GetTrByHostResponseUseCaseParams>>
  {
    async present(
      response: IResponseModel<GetTrByHostResponseUseCaseParams>
    ): Promise<void> {
      // do something
    }
  }
  return new PresenterStub()
}

interface SutTypes {
  sut: GetTrByHostInteractor
  gatewayStub: IGetTrByHostGateway
  mapperStub: IMapper<
    TrustRelation,
    IResponseModel<GetTrByHostResponseUseCaseParams>
  >
  presenterStub: OutputBoundary<
    IResponseModel<GetTrByHostResponseUseCaseParams>
  >
}

const makeSut = (): SutTypes => {
  const gatewayStub = makeGateway()
  const mapperStub = makeMapper()
  const presenterStub = makePresenter()
  const sut = new GetTrByHostInteractor(gatewayStub, mapperStub, presenterStub)
  return {
    sut,
    gatewayStub,
    mapperStub,
    presenterStub
  }
}

const fakeRequestModel: IRequestModel<GetTrByHostRequestUseCaseParams> = {
  requestId: 'fake request id',
  request: {
    host: 'fake request host'
  }
}

describe('GetTrByHostInteractor', () => {
  it('should call gateway findByHost with received host', async () => {
    const { sut, gatewayStub } = makeSut()
    const findByHostSpy = jest.spyOn(gatewayStub, 'findByHost')
    await sut.execute(fakeRequestModel)
    expect(findByHostSpy).toHaveBeenCalledTimes(1)
    expect(findByHostSpy).toHaveBeenCalledWith(fakeRequestModel.request.host)
  })
  it('should throw if gateway throws', async () => {
    const { sut, gatewayStub } = makeSut()
    jest.spyOn(gatewayStub, 'findByHost').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(fakeRequestModel)).rejects.toThrow()
  })
})
