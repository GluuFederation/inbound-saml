// is called with ResponseModel
// maps ResponseModel to IResponse dto
// call eventbus emit with IResponse

import { IReadSpProxyConfigResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigResponse'
import { ReadSpProxyConfigPresenter } from '@sp-proxy/interface-adapters/delivery/ReadSpProxyConfigPresenter'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { ReadSpProxyConfigResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/response/ReadSpProxyConfigResponseUseCaseParams'
import { EventEmitter } from 'stream'

const makeMapper = (): IDeliveryMapper<
  IResponseModel<ReadSpProxyConfigResponseUseCaseParams>,
  IResponse<IReadSpProxyConfigResponse>
> => {
  class MapperStub
    implements
      IDeliveryMapper<
        IResponseModel<ReadSpProxyConfigResponseUseCaseParams>,
        IResponse<IReadSpProxyConfigResponse>
      >
  {
    map(
      responseModel: IResponseModel<ReadSpProxyConfigResponseUseCaseParams>
    ): IResponse<IReadSpProxyConfigResponse> {
      return {
        requestId: 'stubbed mapped requestId',
        body: {
          host: 'stubbed mapped host',
          requestedIdentifierFormat: 'stubbed mapped req id format',
          authnContextIdentifierFormat: 'stubbed mapped authnContext id format',
          skipRequestCompression: true,
          decryption: {
            privateKey: 'stubbed mapped decryption pvt key',
            cert: 'stubbed mapped decryption cert'
          },
          signing: {
            privateKey: 'stubbed mapped signing pvt key',
            cert: 'stubbed mapped signing cert'
          },
          postProfileUrl: 'https://stubbed.mapped.url/path'
        }
      }
    }
  }
  return new MapperStub()
}

interface SutTypes {
  sut: ReadSpProxyConfigPresenter
  mapperStub: IDeliveryMapper<
    IResponseModel<ReadSpProxyConfigResponseUseCaseParams>,
    IResponse<IReadSpProxyConfigResponse>
  >
  eventBusStub: EventEmitter
}

const makeSut = (): SutTypes => {
  const mapperStub = makeMapper()
  const eventBusStub = new EventEmitter()
  const sut = new ReadSpProxyConfigPresenter(mapperStub, eventBusStub)
  return { sut, mapperStub, eventBusStub }
}

const fakeResponseModel: IResponseModel<ReadSpProxyConfigResponseUseCaseParams> =
  {
    requestId: 'fake requestId',
    response: {
      host: 'fake host',
      requestedIdentifierFormat: 'fake req id format',
      authnContextIdentifierFormat: 'fake authnContext id format',
      skipRequestCompression: true,
      decryption: {
        privateKey: 'fake decryption pvt key',
        cert: 'fake decryption cert'
      },
      signing: {
        privateKey: 'fake signing pvt key',
        cert: 'fake signing cert'
      },
      postProfileUrl: 'https://fake.mapped.url/path'
    }
  }

describe('ReadSpProxyConfigPresenter', () => {
  it('should call mapper with received response model', async () => {
    const { mapperStub, sut } = makeSut()
    const mapSpy = jest.spyOn(mapperStub, 'map')
    await sut.present(fakeResponseModel)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeResponseModel)
  })
  it('should throw if mapper throws', async () => {
    const { mapperStub, sut } = makeSut()
    jest.spyOn(mapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.present(fakeResponseModel)).rejects.toThrow()
  })
  it('should call eventBus emit with mapped IResponse DTO', async () => {
    const { mapperStub, sut, eventBusStub } = makeSut()
    const mappedResponseDto = {
      requestId: 'mapped request id',
      body: 'mapped body'
    }
    jest.spyOn(mapperStub, 'map').mockReturnValueOnce(mappedResponseDto as any)
    const emitSpy = jest.spyOn(eventBusStub, 'emit')
    await sut.present(fakeResponseModel)
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith(
      mappedResponseDto.requestId,
      mappedResponseDto
    )
  })
})
