// receive request with no param
// register listener
// calls controller (await..)
// (after event triggered) return response from listener

import { ReadSpProxyConfigFacade } from '@sp-proxy/interface-adapters/api/ReadSpProxyConfigFacade'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { EventEmitter } from 'stream'
import * as crypto from 'crypto'
import { IReadSpProxyConfigRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigRequest'
jest.mock('crypto')

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(request: IRequest<any>): Promise<void> {
      // dispatch request
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: ReadSpProxyConfigFacade
  controllerStub: IController
  eventBusStub: EventEmitter
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const eventBusStub = new EventEmitter()
  const sut = new ReadSpProxyConfigFacade(eventBusStub, controllerStub)
  return { sut, controllerStub, eventBusStub }
}
describe('ReadSpProxyConfigFacade', () => {
  beforeAll(async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue('mocked request id')
  })
  afterAll(async () => {
    jest.clearAllMocks()
  })
  it('should register listener with generated request id', async () => {
    const { sut, eventBusStub } = makeSut()
    const onceSpy = jest.spyOn(eventBusStub, 'once')
    await sut.do()
    expect(onceSpy).toHaveBeenCalledTimes(1)
    expect(onceSpy).toHaveBeenCalledWith(
      'mocked request id',
      expect.any(Function)
    )
  })
  it('should call controller handle with request dto', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const expectedDto: IRequest<IReadSpProxyConfigRequest> = {
      id: 'mocked request id',
      body: null
    }
    await sut.do()
    expect(handleSpy).toHaveBeenCalledTimes(1)
    expect(handleSpy).toHaveBeenCalledWith(expectedDto)
  })
  it('should throw if controller throws', async () => {
    const { sut, controllerStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.do()).rejects.toThrow()
  })
})
