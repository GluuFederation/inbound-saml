import { WinstonLogger } from '@sp-proxy/frameworks-drivers/main/logger/WinstonLogger'
import { makeReadSpProxyConfigComposite } from '@sp-proxy/interface-adapters/api/factories/makeReadSpProxyConfigComposite'
import { ReadSpProxyConfigFacade } from '@sp-proxy/interface-adapters/api/ReadSpProxyConfigFacade'
import { IReadSpProxyConfigResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigResponse'
import { makeLogControllerDecorator } from '@sp-proxy/interface-adapters/delivery/factories/makeLogControllerDecorator'
import { ISyncFacade } from '@sp-proxy/interface-adapters/protocols/ISyncFacade'
import { EventEmitter } from 'stream'

export const makeReadSpProxyConfigFacade = (): ISyncFacade<
  any,
  IReadSpProxyConfigResponse
> => {
  const eventBus = new EventEmitter()
  const controller = makeLogControllerDecorator(
    WinstonLogger.getInstance(),
    makeReadSpProxyConfigComposite(eventBus)
  )
  return new ReadSpProxyConfigFacade(eventBus, controller)
}
