import { CreateRemoteIdpFacade } from '@sp-proxy/interface-adapters/api/CreateRemoteIdpFacade'
import { fakeCreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/mocks/fakeCreateRemoteIdpRequest.mock'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import * as crypto from 'crypto'
import { EventEmitter } from 'stream'
jest.mock('crypto')

const fakeRequest = fakeCreateRemoteIdpRequest
const fakeUseCaseResponse = {
  requestId: fakeRequest.id,
  body: { success: true }
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
  sut: CreateRemoteIdpFacade
  controllerStub: IController
  eventBusStub: EventEmitter
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const eventBusStub = new EventEmitter()
  jest.spyOn(controllerStub as any, 'handle').mockImplementation(() => {
    eventBusStub.emit(fakeRequest.id, fakeUseCaseResponse)
  })
  const sut = new CreateRemoteIdpFacade(controllerStub, eventBusStub)
  return {
    sut: sut,
    controllerStub: controllerStub,
    eventBusStub: eventBusStub
  }
}

describe('CreateRemoteIdpFacade', () => {
  describe('createRemoteIdp', () => {
    beforeAll(() => {
      // jest.clearAllMocks()
      // jest.resetAllMocks()
    })
    it('should call controller with correct values', async () => {
      const { sut, controllerStub } = makeSut()
      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('valid request id')
      const handleSpy = jest.spyOn(controllerStub, 'handle')
      await sut.createRemoteIdp(fakeRequest.body)
      expect(handleSpy).toHaveBeenCalledTimes(1)
      expect(handleSpy).toHaveBeenCalledWith({
        id: 'valid request id',
        body: fakeRequest.body
      })
    })
    it('should register listener', async () => {
      const { sut, eventBusStub } = makeSut()
      const onceSpy = jest.spyOn(eventBusStub, 'once')
      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('valid request id')
      await sut.createRemoteIdp(fakeRequest.body)
      expect(onceSpy).toHaveBeenCalledTimes(1)
      expect(onceSpy).toHaveBeenCalledWith(
        'valid request id',
        expect.any(Function)
      )
    })
    it('should return response body status false', async () => {
      // create sut with different useCaseResponse mock
      const controllerStub = makeController()
      const eventBusStub = new EventEmitter()
      const useCaseResponseMock = {
        requestId: fakeRequest.id,
        body: { success: false }
      }
      jest.spyOn(controllerStub as any, 'handle').mockImplementation(() => {
        eventBusStub.emit(fakeRequest.id, useCaseResponseMock)
      })
      const sut = new CreateRemoteIdpFacade(controllerStub, eventBusStub)
      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('valid request id')

      expect(await sut.createRemoteIdp(fakeRequest.body)).toEqual({
        success: false
      })
    })
    it('should return response body status true', async () => {
      const { sut } = makeSut()
      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('valid request id')
      expect(await sut.createRemoteIdp(fakeRequest.body)).toEqual({
        success: true
      })
    })
  })
})
