// receive response model from interactor
// maps response model to response dto
// dispatch response to eventBus

import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'
import { GetTrByHostPresenter } from '@sp-proxy/interface-adapters/delivery/GetTrByHostPresenter'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { GetTrByHostResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostResponseUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { EventEmitter } from 'stream'

const makeMapper = (): IDeliveryMapper<
  IResponseModel<GetTrByHostResponseUseCaseParams>,
  IResponse<IGetTrByHostResponse>
> => {
  class MapperStub
    implements
      IDeliveryMapper<
        IResponseModel<GetTrByHostResponseUseCaseParams>,
        IResponse<IGetTrByHostResponse>
      >
  {
    map(
      mapFrom: IResponseModel<GetTrByHostResponseUseCaseParams>
    ): IResponse<IGetTrByHostResponse> {
      return {
        requestId: 'stubbed request id',
        body: {
          id: 'stubbed Tr id',
          selectedSsoService: {
            binding: 'stubbed selectedSsoService binding',
            location: 'stubbed selectedSsoService location'
          },
          remoteIdp: {
            id: 'stubbed remoteIdp id',
            name: 'stubbed remoteIdp name',
            host: 'stubbed remoteIdp host',
            singleSignOnService: [
              {
                binding: 'stubbed remoteIdp binding',
                location: 'stubbed remoteIdp location'
              }
            ],
            signingCertificates: ['cert1', 'cert2']
          }
        }
      }
    }
  }
  return new MapperStub()
}

interface SutTypes {
  sut: GetTrByHostPresenter
  mapperStub: IDeliveryMapper<
    IResponseModel<GetTrByHostResponseUseCaseParams>,
    IResponse<IGetTrByHostResponse>
  >
  eventBusStub: EventEmitter
}

const makeSut = (): SutTypes => {
  const mapperStub = makeMapper()
  const eventBusStub = new EventEmitter()
  const sut = new GetTrByHostPresenter(mapperStub, eventBusStub)
  return {
    sut,
    mapperStub,
    eventBusStub
  }
}

const fakeResponseModel: IResponseModel<GetTrByHostResponseUseCaseParams> = {
  requestId: 'fake responseModel requestId',
  response: {
    id: 'fake responseModel TR id',
    selectedSsoService: {
      binding: 'fake responseModel binding',
      location: 'fake responseModel location'
    },
    remoteIdp: {
      id: 'fake responseModel remoteIdp id',
      host: 'fake responseModel remodeIdp host',
      name: 'fake responseModel remoteIdp name',
      singleSignOnService: [
        {
          binding: 'fake responseModel remoteIdp binding',
          location: 'fake responseModel remoteIdp location'
        }
      ],
      signingCertificates: ['fake responseModel cert']
    }
  }
}

describe('GetTrByHostPresenter', () => {
  it('should call mapper with received ResponseModel', async () => {
    const { sut, mapperStub } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    await sut.present(fakeResponseModel)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeResponseModel)
  })
  it('should throw if mapper throws', async () => {
    const { sut, mapperStub } = makeSut()
    jest.spyOn(mapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.present(fakeResponseModel)).rejects.toThrow()
  })
  it('should call eventBus emit with mapped response DTO', async () => {
    const { sut, eventBusStub, mapperStub } = makeSut()
    jest
      .spyOn(mapperStub, 'map')
      .mockReturnValueOnce('mapped response DTO' as any)
    const emitSpy = jest.spyOn(eventBusStub, 'emit')
    await sut.present(fakeResponseModel)
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith(
      fakeResponseModel.requestId,
      'mapped response DTO'
    )
  })
})
