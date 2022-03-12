import { makeGetTrByHostComposite } from '@sp-proxy/interface-adapters/api/factories/makeGetTrByHostComposite'
import { GetTrByHostFacade } from '@sp-proxy/interface-adapters/api/GetTrByHostFacade'
import { IGetTrByHostFacade } from '@sp-proxy/interface-adapters/protocols/IGetTrByHostFacade'
import { EventEmitter } from 'stream'

export const makeOxTrustGetTrByHostFacade = (): IGetTrByHostFacade => {
  const eventBus = new EventEmitter()
  const controller = makeGetTrByHostComposite(eventBus)
  return new GetTrByHostFacade(controller, eventBus)
}
