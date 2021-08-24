import { IController } from '@get-saml-metadata/interface-adapters/delivery/protocols/IController'
import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { GenerateMetadataFacade } from '@sp-proxy/interface-adapters/api/GenerateMetadataFacade'
import { GenerateMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataRequestUseCaseParams'
import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataResponseUseCaseParams'
import { EventEmitter } from 'stream'
import * as crypto from 'crypto'
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

const fakeRequest: IRequest<GenerateMetadataRequestUseCaseParams> = {
  id: 'mocked request id',
  request: 'GenerateSpMetadata'
}

const fakeUseCaseResponse: IResponseModel<GenerateMetadataResponseUseCaseParams> =
  {
    requestId: fakeRequest.id,
    response: {
      xmldata: 'fake xml data from usecase response'
    }
  }

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const eventBusStub = new EventEmitter()
  jest.spyOn(controllerStub as any, 'handle').mockImplementation(() => {
    eventBusStub.emit(fakeRequest.id, fakeUseCaseResponse.response)
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
    expect(await sut.generateMetadata()).toEqual(fakeUseCaseResponse.response)
  })
})
