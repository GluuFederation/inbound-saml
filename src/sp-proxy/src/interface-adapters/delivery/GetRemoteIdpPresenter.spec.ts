// receives response model
// maps response model to response dto (IResponse)
// dispatch IResponse through event emitting

import { GetRemoteIdpPresenter } from '@sp-proxy/interface-adapters/delivery/GetRemoteIdpPresenter'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/protocols/RemoteIdpDeliveryProps'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'
import { EventEmitter } from 'stream'

const makeDtoMapper = (): IDeliveryMapper<
  IResponseModel<RemoteIdpUseCaseProps>,
  IResponse<RemoteIdpDeliveryProps>
> => {
  class DtoMapperStub
    implements
      IDeliveryMapper<
        IResponseModel<RemoteIdpUseCaseProps>,
        IResponse<RemoteIdpDeliveryProps>
      >
  {
    map(
      responseModel: IResponseModel<RemoteIdpUseCaseProps>
    ): IResponse<RemoteIdpDeliveryProps> {
      return {
        requestId: 'valid request id',
        body: {
          id: 'valid remote idp id',
          name: 'valid remote idp name',
          singleSignOnService: [
            {
              binding: 'valid binding',
              location: 'valid location'
            }
          ],
          signingCertificates: ['valid cert']
        }
      }
    }
  }
  return new DtoMapperStub()
}

interface SutTypes {
  eventBusStub: EventEmitter
  dtoMapperStub: IDeliveryMapper<
    IResponseModel<RemoteIdpUseCaseProps>,
    IResponse<RemoteIdpDeliveryProps>
  >
  sut: GetRemoteIdpPresenter
}

const makeSut = (): SutTypes => {
  const eventBusStub = new EventEmitter()
  const dtoMapperStub = makeDtoMapper()
  const sut = new GetRemoteIdpPresenter(dtoMapperStub, eventBusStub)
  return {
    eventBusStub,
    dtoMapperStub,
    sut
  }
}

const fakeResponse: IResponseModel<RemoteIdpUseCaseProps> = {
  requestId: 'valid requestId',
  response: {
    name: 'valid RemoteIdp name',
    singleSignOnService: [
      {
        binding: 'valid binding',
        location: 'valid location'
      }
    ],
    signingCertificates: ['valid cert']
  }
}

describe('GetRemoteIdpPresenter', () => {
  it('should call mapper with response model', async () => {
    const { sut, dtoMapperStub } = makeSut()
    const mapSpy = jest.spyOn(dtoMapperStub, 'map')
    await sut.present(fakeResponse)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(fakeResponse)
  })
  it('should throw if mapper throws', async () => {
    const { sut, dtoMapperStub } = makeSut()
    jest.spyOn(dtoMapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.present(fakeResponse)).rejects.toThrow()
  })
  it('should call eventBus with mapped values', async () => {
    const { sut, dtoMapperStub, eventBusStub } = makeSut()
    const emitSpy = jest.spyOn(eventBusStub, 'emit')
    jest.spyOn(dtoMapperStub as any, 'map').mockReturnValueOnce({
      requestId: 'valid request id',
      body: 'valid body'
    })
    await sut.present(fakeResponse)
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith('valid request id', 'valid body')
  })
})
