import { IGetExternalDataRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IRequest } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequest'
import { IGetExternalDataRequestMapper } from '@get-saml-metadata/interface-adapters/delivery/protocols/IRequestMapper'
import { GetExternalDataRequestModel } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'

export class GetExternalDataRequestMapper implements IGetExternalDataRequestMapper {
  map (request: IRequest<IGetExternalDataRequest>): GetExternalDataRequestModel {
    return {
      requestId: request.id,
      urlOrPath: request.request.urlOrPath
    }
  }
}
