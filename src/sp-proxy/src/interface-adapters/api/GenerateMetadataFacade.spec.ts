import { GenerateMetadataFacade } from '@sp-proxy/interface-adapters/api/GenerateMetadataFacade'
import { EventEmitter } from 'stream'
import * as crypto from 'crypto'
import { IGenerateMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { IGenerateMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataResponse'
jest.mock('crypto')

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(request: IRequest<any>): Promise<void> {
      // do something
    }
  }
  return new ControllerStub()
}
interface SutTypes {
  sut: GenerateMetadataFacade
  controllerStub: IController
  eventBusStub: EventEmitter
}

const fakeRequest: IRequest<IGenerateMetadataRequest> = {
  id: 'mocked request id',
  body: 'generate metadata request'
}

const fakeDeliveryResponse: IResponse<IGenerateMetadataResponse> = {
  requestId: fakeRequest.id,
  body: {
    metadata: 'valid metadata form fake delivery response'
  }
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const eventBusStub = new EventEmitter()
  jest.spyOn(controllerStub as any, 'handle').mockImplementation(() => {
    eventBusStub.emit(fakeRequest.id, fakeDeliveryResponse)
  })
  const sut = new GenerateMetadataFacade(controllerStub, eventBusStub)
  return {
    sut,
    controllerStub,
    eventBusStub
  }
}
describe('GenerateMetadataFacade', () => {
  beforeAll(async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue('mocked request id')
  })
  it('should call eventBus once with correct values', async () => {
    const { sut, eventBusStub } = makeSut()
    const onceSpy = jest.spyOn(eventBusStub, 'once')
    await sut.generateMetadata()
    expect(onceSpy).toHaveBeenCalledTimes(1)
    expect(onceSpy).toHaveBeenCalledWith(
      'mocked request id',
      expect.any(Function)
    )
  })
  it('should call controller with request dto', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.generateMetadata()
    expect(handleSpy).toHaveBeenCalledTimes(1)
    expect(handleSpy).toHaveBeenCalledWith(fakeRequest)
  })
  it('should return response body', async () => {
    const { sut } = makeSut()
    expect(await sut.generateMetadata()).toEqual(fakeDeliveryResponse.body)
  })
  it('should throw if controller throws', async () => {
    const { controllerStub, sut } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.generateMetadata()).rejects.toThrow()
  })
})
