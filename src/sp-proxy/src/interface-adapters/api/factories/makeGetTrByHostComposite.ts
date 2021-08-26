import { GetTrByHostMongoMapper } from '@sp-proxy/interface-adapters/data/mappers/GetTrByHostMongoMapper'
import { MongoGetTrByHost } from '@sp-proxy/interface-adapters/data/MongoGetTrByHost'
import { GetTrByHostController } from '@sp-proxy/interface-adapters/delivery/GetTrByHostController'
import { GetTrByHostPresenter } from '@sp-proxy/interface-adapters/delivery/GetTrByHostPresenter'
import { GetTrByHostControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetTrByHostControllerMapper'
import { GetTrByHostPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetTrByHostPresenterMapper'
import { GetTrByHostValidator } from '@sp-proxy/interface-adapters/delivery/validators/GetTrByHostValidator'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { GetTrByHostInteractor } from '@sp-proxy/use-cases/GetTrByHostInteractor'
import { GetTrByHostUseCaseMapper } from '@sp-proxy/use-cases/mappers/GetTrByHostUseCaseMapper'
import { Collection } from 'mongodb'
import { EventEmitter } from 'stream'

/**
 * for now it creates a GetTrByHostController to be used for mongo adapter
 * @param collection Mongo Collection
 * @param eventBus
 * @returns Controller
 */
export const makeGetTrByHostComposite = (
  collection: Collection,
  eventBus: EventEmitter
): IController => {
  // presenter...
  const presenterMapper = new GetTrByHostPresenterMapper()
  const presenter = new GetTrByHostPresenter(presenterMapper, eventBus)

  // interactor...
  const dataMapper = new GetTrByHostMongoMapper()
  const gateway = new MongoGetTrByHost(collection, dataMapper)
  const entityMapper = new GetTrByHostUseCaseMapper()
  const interactor = new GetTrByHostInteractor(gateway, entityMapper, presenter)

  // controller...
  const validator = new GetTrByHostValidator()
  const controllerMapper = new GetTrByHostControllerMapper()
  return new GetTrByHostController(controllerMapper, interactor, validator)
}
