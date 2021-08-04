import { IGetExternalDataResponse } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataResponse'
import { UrlOrPath } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel';

/**
 * Facade
 */
export interface IGetter {
  getFromFile: (path: UrlOrPath) => Promise<IGetExternalDataResponse>
}
