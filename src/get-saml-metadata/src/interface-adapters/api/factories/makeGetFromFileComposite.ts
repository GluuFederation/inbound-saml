import { makeFileXmlMetadataLoaderAdapter } from '@get-saml-metadata/interface-adapters/data/factories/makeFileLoaderAdapter'
import { makeFileValidatorAdapter } from '@get-saml-metadata/interface-adapters/delivery/factories/makeFileValidatorAdapter'
import { makeGetExternalDataInteractor } from '@get-saml-metadata/interface-adapters/delivery/factories/makeGetExternalDataInteractor'
import { makeGetExternalDataPresenter } from '@get-saml-metadata/interface-adapters/delivery/factories/makeGetExternalDataPresenter'
import { makeGetExternalDataRequestMapper } from '@get-saml-metadata/interface-adapters/delivery/factories/makeGetExternalDataRequestMapper'
import { GetExternalDataController } from '@get-saml-metadata/interface-adapters/delivery/GetExternalDataController'
import { IController } from '@get-saml-metadata/interface-adapters/delivery/protocols/IController'
import { EventEmitter } from 'stream'

/**
 * Creates full composite from presenter to controller
 * @param eventBus
 * @returns controller
 */
export const makeGetFromFileComposite = (eventBus: EventEmitter): IController => {
  const presenter = makeGetExternalDataPresenter(eventBus)
  const fileXmlMetadataLoader = makeFileXmlMetadataLoaderAdapter()
  const interactor = makeGetExternalDataInteractor(presenter, fileXmlMetadataLoader)
  const fileValidator = makeFileValidatorAdapter()
  const externalRequestMapper = makeGetExternalDataRequestMapper()
  const controller = new GetExternalDataController(
    interactor,
    fileValidator,
    externalRequestMapper
  )
  return controller
}
