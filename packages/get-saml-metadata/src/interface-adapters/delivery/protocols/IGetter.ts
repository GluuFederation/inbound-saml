import { IFetchedData } from '@get-saml-metadata/interface-adapters/api/protocols/IFetchedData'
import { UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'

/**
 * Facade
 */
export interface IGetter {
  get: (path: UrlOrPath) => Promise<IFetchedData>
}
