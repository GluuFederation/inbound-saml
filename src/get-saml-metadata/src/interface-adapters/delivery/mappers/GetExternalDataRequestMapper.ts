import { GetExternalDataRequestModel } from '../../../use-cases/GetExternalDataRequestModel'
import { IGetExternalDataRequest } from '../protocols/IGetExternalDataRequest'
import { IRequest } from '../protocols/IRequest'
import { IGetExternalDataRequestMapper } from '../protocols/IRequestMapper'

export class GetExternalDataRequestMapper implements IGetExternalDataRequestMapper {
  map (request: IRequest<IGetExternalDataRequest>): GetExternalDataRequestModel {
    return {
      requestId: request.id,
      urlOrPath: request.request.urlOrPath
    }
  }
}
