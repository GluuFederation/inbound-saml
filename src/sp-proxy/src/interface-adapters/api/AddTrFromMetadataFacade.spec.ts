// receives params
// creates request id
// register eventBus once listener with request id as event name
// calls controller
// return result emitted to eventBus

import { AddTrFromMetadataFacade } from '@sp-proxy/interface-adapters/api/AddTrFromMetadataFacade'
import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import * as crypto from 'crypto'
import { EventEmitter } from 'stream'
jest.mock('crypto')

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(request: IRequest<IAddTrFromMetadataRequest>): Promise<void> {
      // do something
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: AddTrFromMetadataFacade
  controllerStub: IController
  eventBusStub: EventEmitter
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const eventBusStub = new EventEmitter()
  const sut = new AddTrFromMetadataFacade(controllerStub, eventBusStub)
  return {
    sut,
    controllerStub,
    eventBusStub
  }
}

const fakeParams: IAddTrFromMetadataRequest = {
  name: 'valid fake name param',
  url: 'valid fake url param'
}

describe('AddFromMetadataFacade', () => {
  beforeAll(async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue('valid mocked request id')
  })
  it('should call eventBus once with request id', async () => {
    const { sut, eventBusStub } = makeSut()
    const onceSpy = jest.spyOn(eventBusStub, 'once')
    await sut.addTrFromMetadata(fakeParams)
    expect(onceSpy).toHaveBeenCalledTimes(1)
    expect(onceSpy).toHaveBeenCalledWith(
      'valid mocked request id',
      expect.any(Function)
    )
  })
  it('should call controller handle with IRequest', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const expected: IRequest<IAddTrFromMetadataRequest> = {
      id: 'valid mocked request id',
      body: fakeParams
    }
    await sut.addTrFromMetadata(fakeParams)
    expect(handleSpy).toHaveBeenCalledTimes(1)
    expect(handleSpy).toHaveBeenCalledWith(expected)
  })
})
