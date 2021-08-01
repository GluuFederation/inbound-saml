import { GetExternalDataRequestModel } from '../../../use-cases/GetExternalDataRequestModel'
import { IGetExternalDataRequest } from '../protocols/IGetExternalDataRequest'
import { IRequest } from '../protocols/IRequest'
import { IRequestMapper } from '../protocols/IRequestMapper'

export class GetExternalDataRequestMapper implements IRequestMapper {
  map (request: IRequest<IGetExternalDataRequest>): GetExternalDataRequestModel {
    return {
      requestId: request.id,
      urlOrPath: request.request.urlOrPath
    }
  }
}
