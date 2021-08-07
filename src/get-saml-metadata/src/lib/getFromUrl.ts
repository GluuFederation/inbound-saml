import { makeGetComposite } from '@get-saml-metadata/interface-adapters/api/factories/makeGetComposite'
import { GetSamlMetadataFacade } from '@get-saml-metadata/interface-adapters/api/GetSamlMetadataFacade'
import { IGetter } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetter'
import { UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { EventEmitter } from 'stream'

// TODO: create same makeGetterComposite factory for url and file
const makeGetter = (): IGetter => {
  const eventBus = new EventEmitter()
  const controller = makeGetComposite('url', eventBus)
  return new GetSamlMetadataFacade(eventBus, controller)
}

// TODO: create type for return
export const getFromUrl = (url: UrlOrPath): any => {
  const getter = makeGetter()
  return getter.get(url)
}
