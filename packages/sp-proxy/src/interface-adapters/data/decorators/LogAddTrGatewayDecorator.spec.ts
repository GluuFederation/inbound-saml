import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { ILogger } from '@sp-proxy/interface-adapters/protocols/ILogger'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import { LogAddTrGatewayDecorator } from './LogAddTrGatewayDecorator'

const makeLogger = (): ILogger => {
  class LoggerStub implements ILogger {
    debug(stack: string): void {}
    info(stack: string): void {}
    warn(stack: string): void {}
    error(stack: string): void {}
  }
  return new LoggerStub()
}

const makeGateway = (): IAddTrGateway => {
  class AddTrGatewayStub implements IAddTrGateway {
    async add(trustRelation: TrustRelation): Promise<boolean> {
      // do something
      return true
    }
  }
  return new AddTrGatewayStub()
}

interface SutTypes {
  loggerStub: ILogger
  gatewayStub: IAddTrGateway
  sut: IAddTrGateway
}

const makeSut = (): SutTypes => {
  const loggerStub = makeLogger()
  const gatewayStub = makeGateway()
  const sut = new LogAddTrGatewayDecorator(loggerStub, gatewayStub)
  return {
    loggerStub,
    gatewayStub,
    sut
  }
}

const trustRelationQuickMock: object = {
  props: {
    remoteIdp: {
      props: {
        host: 'valid host'
      }
    }
  }
}

describe('LogAddTrGatewayDecorator', () => {
  it('should call info with expected params', async () => {
    const { loggerStub, sut } = makeSut()
    const infoSpy = jest.spyOn(loggerStub, 'info')
    await sut.add(trustRelationQuickMock as unknown as TrustRelation)
    expect(infoSpy).toHaveBeenCalledWith(
      'AddTrGatewayStub: Creating Trust Relation valid host in persistence...'
    )
  })
  it('should call debug with expected params', async () => {
    const { loggerStub, sut } = makeSut()
    const debugSpy = jest.spyOn(loggerStub, 'debug')
    await sut.add(trustRelationQuickMock as unknown as TrustRelation)
    expect(debugSpy).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify(trustRelationQuickMock, null, 4))
    )
  })
  it('should call add with trustRelation', async () => {
    const { gatewayStub, sut } = makeSut()
    const addSpy = jest.spyOn(gatewayStub, 'add')
    await sut.add(trustRelationQuickMock as unknown as TrustRelation)
    expect(addSpy).toHaveBeenCalledWith(trustRelationQuickMock)
  })
})
