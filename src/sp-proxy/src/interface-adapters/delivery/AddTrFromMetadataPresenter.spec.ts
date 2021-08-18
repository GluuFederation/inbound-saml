// receive ResponseModel (called by interactor)
// maps to IResponse (dto)
// calls eventBus.emit with IResponse

import { AddTrFromMetadataPresenter } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataPresenter'
import { IAddTrFromMetadataResponse } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataResponse'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseModel } from '@sp-proxy/use-cases/io-models/SuccessResponseModel'
import { EventEmitter } from 'stream'

const makeMapper = (): IDeliveryMapper<
  IResponseModel<SuccessResponseModel>,
  IResponse<IAddTrFromMetadataResponse>
> => {
  class MapperStub
    implements
      IDeliveryMapper<
        IResponseModel<SuccessResponseModel>,
        IResponse<IAddTrFromMetadataResponse>
      >
  {
    map(
      mapFrom: IResponseModel<SuccessResponseModel>
    ): IResponse<IAddTrFromMetadataResponse> {
      return {
        requestId: 'a valid mapped request id',
        body: {
          success: true
        }
      }
    }
  }
  return new MapperStub()
}

interface SutTypes {
  sut: AddTrFromMetadataPresenter
  mapperStub: IDeliveryMapper<
    IResponseModel<SuccessResponseModel>,
    IResponse<IAddTrFromMetadataResponse>
  >
  eventBusStub: EventEmitter
}

const makeSut = (): SutTypes => {
  const eventBusStub = new EventEmitter()
  const mapperStub = makeMapper()
  const sut = new AddTrFromMetadataPresenter(mapperStub, eventBusStub)
  return {
    sut,
    mapperStub,
    eventBusStub
  }
}

const fakeResponse: IResponseModel<SuccessResponseModel> = {
  requestId: 'a valid fakeResponse request id',
  response: {
    success: true
  }
}

describe('AddTrFromMetadataPresenter', () => {
  it('should call mapper with received response', async () => {
    const { sut, mapperStub } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    await sut.present(fakeResponse)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeResponse)
  })
  it('should call eventBus with mapped response model', async () => {
    const { sut, eventBusStub, mapperStub } = makeSut()
    const emitSpy = jest.spyOn(eventBusStub, 'emit')
    jest
      .spyOn(mapperStub as any, 'map')
      .mockReturnValueOnce('valid response model from mapper')
    await sut.present(fakeResponse)
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith(
      fakeResponse.requestId,
      'valid response model from mapper'
    )
  })
  it('should throw if mapper throws', async () => {
    const { sut, mapperStub } = makeSut()
    jest.spyOn(mapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.present(fakeResponse)).rejects.toThrow()
  })
  it('should throw if eventBus throws', async () => {
    const { sut, eventBusStub } = makeSut()
    jest.spyOn(eventBusStub, 'emit').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.present(fakeResponse)).rejects.toThrow()
  })
})
