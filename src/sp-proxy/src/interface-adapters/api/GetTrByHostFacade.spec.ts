// received host
// register listener
// calls controller (await..)
// (after event triggered) return response from listener

import { GetTrByHostFacade } from '@sp-proxy/interface-adapters/api/GetTrByHostFacade'
import { IGetTrByHostRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostRequest'
import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import * as crypto from 'crypto'
import { EventEmitter } from 'stream'
jest.mock('crypto')

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(request: IRequest<IGetTrByHostRequest>): Promise<void> {
      // do something
    }
  }
  return new ControllerStub()
}

const fakeRequestDto: IRequest<IGetTrByHostRequest> = {
  id: 'fake request id',
  body: {
    host: 'fake request host'
  }
}

const fakeResponseDto: IResponse<IGetTrByHostResponse> = {
  requestId: 'fake response request id',
  body: {
    id: 'fake response tr id',
    selectedSsoService: {
      binding: 'fake response binding',
      location: 'fake response location'
    },
    remoteIdp: {
      id: 'fake response remoteIdp id',
      name: 'fake response remoteIdp name',
      singleSignOnService: [
        {
          binding: 'fake response remoteIdp binding',
          location: 'fake response remoteIdp location'
        }
      ],
      signingCertificates: ['fake response cert']
    }
  }
}

interface SutTypes {
  sut: GetTrByHostFacade
  controllerStub: IController
  eventBusStub: EventEmitter
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const eventBusStub = new EventEmitter()
  // mock controller to call eventBus (in the full impl event is triggered by presenter)
  jest.spyOn(controllerStub as any, 'handle').mockImplementation(() => {
    eventBusStub.emit(fakeRequestDto.id, fakeResponseDto)
  })
  const sut = new GetTrByHostFacade(controllerStub, eventBusStub)
  return {
    sut,
    controllerStub,
    eventBusStub
  }
}

describe('GetTrByHostFacade', () => {
  beforeAll(async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(fakeRequestDto.id)
  })
  afterAll(async () => {
    jest.clearAllMocks()
  })
  it('should register listener with request id', async () => {
    const { sut, eventBusStub } = makeSut()
    const onceSpy = jest.spyOn(eventBusStub, 'once')
    await sut.getTrByHost('any valid host')
    expect(onceSpy).toHaveBeenCalledTimes(1)
    expect(onceSpy).toHaveBeenCalledWith(
      fakeRequestDto.id,
      expect.any(Function)
    )
  })
  it('should call controller handle with request dto', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.getTrByHost(fakeRequestDto.body.host)
    expect(handleSpy).toHaveBeenCalledTimes(1)
    expect(handleSpy).toHaveBeenCalledWith(fakeRequestDto)
  })
  it('should throw if controller throws', async () => {
    const { sut, controllerStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.getTrByHost('any valid host')).rejects.toThrow()
  })
})
