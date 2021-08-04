import { makeFileXmlMetadataLoaderAdapter } from '@get-saml-metadata/interface-adapters/data/factories/makeFileLoaderAdapter'
import { makeExternalDataMapper } from '@get-saml-metadata/interface-adapters/delivery/factories/makeExternalDataMapper'
import { makeMetadataMapper } from '@get-saml-metadata/interface-adapters/delivery/factories/makeMetadataMapper'
import { GetExternalDataInteractor } from '@get-saml-metadata/use-cases/GetExternalDataInteractor'
import { BaseGetExternalDataInteractor } from '@get-saml-metadata/use-cases/IGetExternalDataInputBoundary'
import { IGetExternalDataOutputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataOutputBoundary'

export const makeGetExternalDataInteractor = (
  presenter: IGetExternalDataOutputBoundary): BaseGetExternalDataInteractor => {
  return new GetExternalDataInteractor(
    makeFileXmlMetadataLoaderAdapter(),
    makeMetadataMapper(),
    makeExternalDataMapper(),
    presenter
  )
}
