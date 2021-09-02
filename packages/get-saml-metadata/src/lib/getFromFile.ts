import { makeGetComposite } from '@get-saml-metadata/interface-adapters/api/factories/makeGetComposite'
import { GetSamlMetadataFacade } from '@get-saml-metadata/interface-adapters/api/GetSamlMetadataFacade'
import { IFetchedData } from '@get-saml-metadata/interface-adapters/api/protocols/IFetchedData'
import { IGetter } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetter'
import { UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { EventEmitter } from 'stream'

const makeGetter = (): IGetter => {
  const eventBus = new EventEmitter()
  const controller = makeGetComposite('file', eventBus)
  return new GetSamlMetadataFacade(eventBus, controller)
}

export const getFromFile = async (path: UrlOrPath): Promise<IFetchedData> => {
  const getter = makeGetter()
  return await getter.get(path)
}
