import config from '@sp-proxy/interface-adapters/config/env'
import { makeUmaAuthenticator } from '@sp-proxy/interface-adapters/data/factories/makeUmaAuthenticator'
import { GetTrByHostOxtrustMapper } from '@sp-proxy/interface-adapters/data/mappers/GetTrByHostOxTrustMapper'
import { OxTrustGetTrByHost } from '@sp-proxy/interface-adapters/data/OxTrustGetTrByHost'
import { GetTrByHostController } from '@sp-proxy/interface-adapters/delivery/GetTrByHostController'
import { GetTrByHostPresenter } from '@sp-proxy/interface-adapters/delivery/GetTrByHostPresenter'
import { GetTrByHostControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetTrByHostControllerMapper'
import { GetTrByHostPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetTrByHostPresenterMapper'
import { GetTrByHostValidator } from '@sp-proxy/interface-adapters/delivery/validators/GetTrByHostValidator'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { GetTrByHostInteractor } from '@sp-proxy/use-cases/GetTrByHostInteractor'
import { GetTrByHostUseCaseMapper } from '@sp-proxy/use-cases/mappers/GetTrByHostUseCaseMapper'
import { EventEmitter } from 'stream'

/**
 * for now it creates a GetTrByHostController to be used for oxTrust adapter
 * @param eventBus
 * @returns Controller
 */
export const makeGetTrByHostComposite = (
  eventBus: EventEmitter
): IController => {
  // presenter...
  const presenterMapper = new GetTrByHostPresenterMapper()
  const presenter = new GetTrByHostPresenter(presenterMapper, eventBus)

  // interactor...
  const dataMapper = new GetTrByHostOxtrustMapper()
  const gateway = new OxTrustGetTrByHost(
    dataMapper,
    config.oxTrustApi,
    makeUmaAuthenticator()
  )
  const entityMapper = new GetTrByHostUseCaseMapper()
  const interactor = new GetTrByHostInteractor(gateway, entityMapper, presenter)

  // controller...
  const validator = new GetTrByHostValidator()
  const controllerMapper = new GetTrByHostControllerMapper()
  return new GetTrByHostController(controllerMapper, interactor, validator)
}
