// receive response model from interactor
// map response model 2 response dto

import { IGenerateMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataResponse'
import { GenerateMetadataPresenter } from '@sp-proxy/interface-adapters/delivery/GenerateMetadataPresenter'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataResponseUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { EventEmitter } from 'stream'

// call eventbus with response dto
const makeMapper = (): IDeliveryMapper<
  IResponseModel<GenerateMetadataResponseUseCaseParams>,
  IResponse<IGenerateMetadataResponse>
> => {
  class MapperStub
    implements
      IDeliveryMapper<
        IResponseModel<GenerateMetadataResponseUseCaseParams>,
        IResponse<IGenerateMetadataResponse>
      >
  {
    map(
      mapFrom: IResponseModel<GenerateMetadataResponseUseCaseParams>
    ): IResponse<IGenerateMetadataResponse> {
      return {
        requestId: 'stubbed mapped request id',
        body: {
          metadata: 'valid mapped metadata'
        }
      }
    }
  }
  return new MapperStub()
}

interface SutTypes {
  sut: GenerateMetadataPresenter
  mapperStub: IDeliveryMapper<
    IResponseModel<GenerateMetadataResponseUseCaseParams>,
    IResponse<IGenerateMetadataResponse>
  >
  eventBusStub: EventEmitter
}

const makeSut = (): SutTypes => {
  const mapperStub = makeMapper()
  const eventBusStub = new EventEmitter()
  const sut = new GenerateMetadataPresenter(mapperStub, eventBusStub)
  return {
    sut,
    mapperStub,
    eventBusStub
  }
}

const fakeResponseModel: IResponseModel<GenerateMetadataResponseUseCaseParams> =
  {
    requestId: 'fake request id',
    response: {
      xmldata: 'fake xml data'
    }
  }

describe('GenerateMetadataPresenter', () => {
  it('should call mapper with response model', async () => {
    const { sut, mapperStub } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    await sut.present(fakeResponseModel)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeResponseModel)
  })
  it('should call eventbus emit with returned dto', async () => {
    const { sut, eventBusStub, mapperStub } = makeSut()
    const emitSpy = jest.spyOn(eventBusStub, 'emit')
    jest
      .spyOn(mapperStub as any, 'map')
      .mockReturnValueOnce('mapped response dto')
    await sut.present(fakeResponseModel)
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith(
      fakeResponseModel.requestId,
      'mapped response dto'
    )
  })
})
