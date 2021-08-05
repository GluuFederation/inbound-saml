import { makeControllerComposite } from '@get-saml-metadata/interface-adapters/api/factories/makeControllerComposite'
import { GetSamlMetadataFacade } from '@get-saml-metadata/interface-adapters/api/GetSamlMetadataFacade'
import { IGetter } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetter'
import { UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { EventEmitter } from 'stream'

const makeGetter = (): IGetter => {
  const eventBus = new EventEmitter()
  const controller = makeControllerComposite(eventBus)
  return new GetSamlMetadataFacade(
    eventBus, controller
  )
}

export const getFromFile = (path: UrlOrPath): any => {
  const getter = makeGetter()
  return getter.getFromFile(path)
}
