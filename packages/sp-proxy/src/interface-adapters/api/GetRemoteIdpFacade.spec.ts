// create request id
// register eventbus listener with request id
// create request dto
// call controller handle w/ request dto
// return result pushed by eventbus listener

import { GetRemoteIdpFacade } from '@sp-proxy/interface-adapters/api/GetRemoteIdpFacade'
import { GetByIdDTO } from '@sp-proxy/interface-adapters/delivery/dtos/GetByIdDTO'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { RemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'
import * as crypto from 'crypto'
import { EventEmitter } from 'stream'
jest.mock('crypto')

const fakeRequest: IRequest<GetByIdDTO> = {
  id: 'valid GetRemoteIdp request id',
  body: {
    id: 'valid remote idp id'
  }
}

const fakeUseCaseResponse: IResponse<RemoteIdpUseCaseParams> = {
  requestId: 'valid request id',
  body: {
    id: 'entity id',
    name: 'entity name',
    signingCertificates: ['valid cert'],
    singleSignOnService: [{ binding: 'binding', location: 'location' }]
  }
}

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(request: IRequest<any>): Promise<void> {
      // do something cool
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: GetRemoteIdpFacade
  controllerStub: IController
  eventBusStub: EventEmitter
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const eventBusStub = new EventEmitter()
  // mock controller to call eventBus (in the full impl event is triggered by presenter)
  jest.spyOn(controllerStub as any, 'handle').mockImplementation(() => {
    eventBusStub.emit(fakeRequest.id, fakeUseCaseResponse)
  })
  const sut = new GetRemoteIdpFacade(controllerStub, eventBusStub)
  return {
    sut,
    controllerStub,
    eventBusStub
  }
}

describe('GetRemoteIdpFacade', () => {
  it('should register listener with request ID', async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('valid request id')
    const { sut, eventBusStub } = makeSut()
    const onceSpy = jest.spyOn(eventBusStub, 'once')
    await sut.getRemoteIdp(fakeRequest.body.id)
    expect(onceSpy).toHaveBeenCalledTimes(1)
    expect(onceSpy).toHaveBeenCalledWith(
      'valid request id',
      expect.any(Function)
    )
  })
  it('should call controller with request dto', async () => {
    const { sut, controllerStub } = makeSut()
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('valid request id')
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.getRemoteIdp(fakeRequest.body.id)
    expect(handleSpy).toHaveBeenCalledTimes(1)
    expect(handleSpy).toHaveBeenCalledWith({
      id: 'valid request id',
      body: fakeRequest.body
    })
  })
  it('should return response body', async () => {
    const { sut } = makeSut()
    jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(fakeRequest.id)
    expect(await sut.getRemoteIdp(fakeRequest.body.id)).toEqual(
      fakeUseCaseResponse.body
    )
  })
})
