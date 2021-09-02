import { makeXmlMetadataLoaderAdapter } from '@get-saml-metadata/interface-adapters/data/factories/makeFileLoaderAdapter'
import { makeGetExternalDataInteractor } from '@get-saml-metadata/interface-adapters/delivery/factories/makeGetExternalDataInteractor'
import { makeGetExternalDataPresenter } from '@get-saml-metadata/interface-adapters/delivery/factories/makeGetExternalDataPresenter'
import { makeGetExternalDataRequestMapper } from '@get-saml-metadata/interface-adapters/delivery/factories/makeGetExternalDataRequestMapper'
import { makeValidatorAdapter } from '@get-saml-metadata/interface-adapters/delivery/factories/makeValidatorAdapter'
import { GetExternalDataController } from '@get-saml-metadata/interface-adapters/delivery/GetExternalDataController'
import { IController } from '@get-saml-metadata/interface-adapters/delivery/protocols/IController'
import { SourceType } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { EventEmitter } from 'stream'

/**
 * Creates full composite from presenter to controller
 * @param eventBus
 * @returns controller
 */
export const makeGetComposite = (
  source: SourceType,
  eventBus: EventEmitter
): IController => {
  const presenter = makeGetExternalDataPresenter(eventBus)
  const fileXmlMetadataLoader = makeXmlMetadataLoaderAdapter(source)
  const interactor = makeGetExternalDataInteractor(
    presenter,
    fileXmlMetadataLoader
  )
  const fileValidator = makeValidatorAdapter(source)
  const externalRequestMapper = makeGetExternalDataRequestMapper()
  const controller = new GetExternalDataController(
    interactor,
    fileValidator,
    externalRequestMapper
  )
  return controller
}
