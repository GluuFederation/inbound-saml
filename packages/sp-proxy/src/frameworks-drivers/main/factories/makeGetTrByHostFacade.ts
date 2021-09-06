import { makeGetTrByHostComposite } from '@sp-proxy/interface-adapters/api/factories/makeGetTrByHostComposite'
import { IGetTrByHostFacade } from '@sp-proxy/interface-adapters/protocols/IGetTrByHostFacade'
import { Collection } from 'mongodb'
import { EventEmitter } from 'stream'
import { GetTrByHostFacade } from '@sp-proxy/interface-adapters/api/GetTrByHostFacade'

export const makeMongoGetTrByHostFacade = (
  collection: Collection
): IGetTrByHostFacade => {
  const eventBus = new EventEmitter()
  const controller = makeGetTrByHostComposite(collection, eventBus)
  return new GetTrByHostFacade(controller, eventBus)
}
