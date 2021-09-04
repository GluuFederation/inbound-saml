// receive IRequest dto
// map to RequestModel
// call interactor with request model

import { IReadSpProxyConfigRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigRequest'
import { ReadSpProxyConfigController } from '@sp-proxy/interface-adapters/delivery/ReadSpProxyConfigController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { ReadSpProxyConfigRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigRequestUseCaseParams'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

const makeMapper = (): IDeliveryMapper<
  IRequest<IReadSpProxyConfigRequest>,
  IRequestModel<ReadSpProxyConfigRequestUseCaseParams>
> => {
  class MapperStub
    implements
      IDeliveryMapper<
        IRequest<IReadSpProxyConfigRequest>,
        IRequestModel<ReadSpProxyConfigRequestUseCaseParams>
      >
  {
    map(
      dto: IRequest<IReadSpProxyConfigRequest>
    ): IRequestModel<ReadSpProxyConfigRequestUseCaseParams> {
      return {
        requestId: 'mapped stubbed request id',
        request: null
      }
    }
  }
  return new MapperStub()
}

const makeInteractor =
  (): InputBoundary<ReadSpProxyConfigRequestUseCaseParams> => {
    class InteractorStub
      implements InputBoundary<ReadSpProxyConfigRequestUseCaseParams>
    {
      async execute(
        request: IRequestModel<ReadSpProxyConfigRequestUseCaseParams>
      ): Promise<void> {
        // do something
      }
    }
    return new InteractorStub()
  }

interface SutTypes {
  sut: ReadSpProxyConfigController
  mapperStub: IDeliveryMapper<
    IRequest<IReadSpProxyConfigRequest>,
    IRequestModel<ReadSpProxyConfigRequestUseCaseParams>
  >
  interactorStub: InputBoundary<ReadSpProxyConfigRequestUseCaseParams>
}

const makeSut = (): SutTypes => {
  const mapperStub = makeMapper()
  const interactorStub = makeInteractor()
  const sut = new ReadSpProxyConfigController(mapperStub, interactorStub)
  return { sut, mapperStub, interactorStub }
}

const fakeRequestDto: IRequest<IReadSpProxyConfigRequest> = {
  id: 'fake request dto id',
  body: null
}

describe('ReadSpProxyController', () => {
  it('should call mapper with received request', async () => {
    const { sut, mapperStub } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    await sut.handle(fakeRequestDto)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeRequestDto)
  })
  it('should throw if mapper throws', async () => {
    const { sut, mapperStub } = makeSut()
    jest.spyOn(mapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequestDto)).rejects.toThrow()
  })
  it('should call interactor with mapped response', async () => {
    const { sut, mapperStub, interactorStub } = makeSut()
    jest.spyOn(mapperStub, 'map').mockReturnValueOnce('mapped response' as any)
    const executeSpy = jest.spyOn(interactorStub, 'execute')
    await sut.handle(fakeRequestDto)
    expect(executeSpy).toBeCalledTimes(1)
    expect(executeSpy).toBeCalledWith('mapped response')
  })
  it('should throw if interactor throws', async () => {
    const { sut, interactorStub } = makeSut()
    jest.spyOn(interactorStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.handle(fakeRequestDto)).rejects.toThrow()
  })
})
