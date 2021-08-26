// receive request dto (IRequest)
// maps to request model
// dispatch to usecase interactor

import { IGetTrByHostRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostRequest'
import { GetTrByHostController } from '@sp-proxy/interface-adapters/delivery/GetTrByHostController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { GetTrByHostRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostRequestUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

const makeMapper = (): IDeliveryMapper<
  IRequest<IGetTrByHostRequest>,
  IRequestModel<GetTrByHostRequestUseCaseParams>
> => {
  class MapperStub
    implements
      IDeliveryMapper<
        IRequest<IGetTrByHostRequest>,
        IRequestModel<GetTrByHostRequestUseCaseParams>
      >
  {
    map(
      mapFrom: IRequest<IGetTrByHostRequest>
    ): IRequestModel<GetTrByHostRequestUseCaseParams> {
      return {
        requestId: 'stubbed requestId',
        request: {
          host: 'stubbed host'
        }
      }
    }
  }
  return new MapperStub()
}

const makeInteractor = (): InputBoundary<GetTrByHostRequestUseCaseParams> => {
  class InteractorStub
    implements InputBoundary<GetTrByHostRequestUseCaseParams>
  {
    async execute(
      request: IRequestModel<GetTrByHostRequestUseCaseParams>
    ): Promise<void> {
      // do something
    }
  }
  return new InteractorStub()
}

interface SutTypes {
  sut: GetTrByHostController
  mapperStub: IDeliveryMapper<
    IRequest<IGetTrByHostRequest>,
    IRequestModel<GetTrByHostRequestUseCaseParams>
  >
  interactorStub: InputBoundary<GetTrByHostRequestUseCaseParams>
}

const makeSut = (): SutTypes => {
  const mapperStub = makeMapper()
  const interactorStub = makeInteractor()
  const sut = new GetTrByHostController(mapperStub, interactorStub)
  return {
    sut,
    mapperStub,
    interactorStub
  }
}

const fakeRequest: IRequest<IGetTrByHostRequest> = {
  id: 'fake request id',
  body: {
    host: 'fake host'
  }
}

describe('GetByTrHostController', () => {
  it('should call mapper with received dto', async () => {
    const { mapperStub, sut } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    await sut.handle(fakeRequest)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeRequest)
  })
})
