import { IGetExternalDataRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'
import { GetExternalDataRequestModel } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'

export interface IGetExternalDataRequestMapper {
  map: (
    request: IRequest<IGetExternalDataRequest>
  ) => GetExternalDataRequestModel
}
