import { makeExternalDataMapper } from '@get-saml-metadata/interface-adapters/delivery/factories/makeExternalDataMapper'
import { makeMetadataMapper } from '@get-saml-metadata/interface-adapters/delivery/factories/makeMetadataMapper'
import { GetExternalDataInteractor } from '@get-saml-metadata/use-cases/GetExternalDataInteractor'
import { BaseGetExternalDataInteractor } from '@get-saml-metadata/use-cases/IGetExternalDataInputBoundary'
import { IGetExternalDataOutputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataOutputBoundary'
import { IXmlMetadataLoaderGateway } from '@get-saml-metadata/use-cases/ports/IXmlMetadataLoaderGateway'

export const makeGetExternalDataInteractor = (
  presenter: IGetExternalDataOutputBoundary,
  gateway: IXmlMetadataLoaderGateway
): BaseGetExternalDataInteractor => {
  return new GetExternalDataInteractor(
    gateway,
    makeMetadataMapper(),
    makeExternalDataMapper(),
    presenter
  )
}
