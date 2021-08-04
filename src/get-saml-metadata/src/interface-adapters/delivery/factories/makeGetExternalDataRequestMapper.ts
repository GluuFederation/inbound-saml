import { GetExternalDataRequestMapper } from '@get-saml-metadata/interface-adapters/delivery/mappers/GetExternalDataRequestMapper'
import { IGetExternalDataRequestMapper } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequestMapper'

export const makeGetExternalDataRequestMapper = (): IGetExternalDataRequestMapper => {
  return new GetExternalDataRequestMapper()
}
