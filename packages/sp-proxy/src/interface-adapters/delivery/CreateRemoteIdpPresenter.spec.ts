import { CreateRemoteIdpPresenter } from '@sp-proxy/interface-adapters/delivery/CreateRemoteIdpPresenter'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/response/SuccessResponseUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { EventEmitter } from 'stream'
import { ICreateRemoteIdpResponse } from '@sp-proxy/interface-adapters/delivery/dtos/ICreateRemoteIdpResponse'

interface SutTypes {
  sut: CreateRemoteIdpPresenter
  eventBusStub: EventEmitter
}

const makeSut = (): SutTypes => {
  const eventBus = new EventEmitter()
  const sut = new CreateRemoteIdpPresenter(eventBus)
  return {
    sut: sut,
    eventBusStub: eventBus
  }
}

const fakeResponseModel: IResponseModel<SuccessResponseUseCaseParams> = {
  requestId: 'valid request id',
  response: {
    success: true
  }
}

describe('CreateRemoteIdpPresenter', () => {
  it('should call event emit with correct values', async () => {
    const { sut, eventBusStub } = makeSut()
    const emitSpy = jest.spyOn(eventBusStub, 'emit')
    await sut.present(fakeResponseModel)
    const expectedResponse: IResponse<ICreateRemoteIdpResponse> = {
      requestId: fakeResponseModel.requestId,
      body: {
        success: fakeResponseModel.response.success
      }
    }

    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith(
      fakeResponseModel.requestId,
      expectedResponse
    )
  })
})
