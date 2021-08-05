import { IExternalDataMapper } from '@get-saml-metadata/use-cases/ports/IExternalDataMapper'
import { ExternalDataMapper } from '@get-saml-metadata/use-cases/utils/ExternalDataMapper'

export const makeExternalDataMapper = (): IExternalDataMapper => {
  return new ExternalDataMapper()
}
