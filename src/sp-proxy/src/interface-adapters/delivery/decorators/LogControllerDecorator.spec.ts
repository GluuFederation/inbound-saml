// calls logger
// calls controller

import { LogControllerDecorator } from '@sp-proxy/interface-adapters/delivery/decorators/LogControllerDecorator'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ILogger } from '@sp-proxy/interface-adapters/protocols/ILogger'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'

const makeLogger = (): ILogger => {
  class LoggerStub implements ILogger {
    debug(stack: string): void {}
    info(stack: string): void {}
    warn(stack: string): void {}
    error(stack: string): void {}
  }
  return new LoggerStub()
}

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(request: IRequest<any>): Promise<void> {
      // do something
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  loggerStub: ILogger
  controllerStub: IController
}

const makeSut = (): SutTypes => {
  const loggerStub = makeLogger()
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(loggerStub, controllerStub)
  return {
    sut,
    loggerStub,
    controllerStub
  }
}

describe('LogControllerDecorator', () => {
  it('should call logger debug with expected params', async () => {
    const { sut, loggerStub } = makeSut()
    const debugSpy = jest.spyOn(loggerStub, 'debug')
    const request = {
      id: 'valid id',
      body: 'valid body'
    }
    await sut.handle(request)
    expect(debugSpy).toHaveBeenCalledTimes(1)
    expect(debugSpy).toHaveBeenCalledWith(
      `ControllerStub: called handle method with ${JSON.stringify(request)}`
    )
  })
})
