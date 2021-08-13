import { CreateRemoteIdpPresenter } from '@sp-proxy/interface-adapters/delivery/CreateRemoteIdpPresenter'
import { CreateRemoteIdpResponseModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpResponseModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { EventEmitter } from 'stream'

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

const fakeResponse: IResponseModel<CreateRemoteIdpResponseModel> = {
  requestId: 'valid request id',
  response: {
    success: true
  }
}

describe('CreateRemoteIdpPresenter', () => {
  it('should call event emit with correct values', async () => {
    const { sut, eventBusStub } = makeSut()
    const emitSpy = jest.spyOn(eventBusStub, 'emit')
    await sut.present(fakeResponse)
    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).toHaveBeenCalledWith(fakeResponse.requestId, fakeResponse)
  })
})
