import { GetByIdDTO } from '@sp-proxy/interface-adapters/protocols/GetByIdDTO'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { GetRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/GetRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class GetRemoteIdpControllerMapper
  implements
    IDeliveryMapper<
      IRequest<GetByIdDTO>,
      IRequestModel<GetRemoteIdpRequestModel>
    >
{
  map(request: IRequest<GetByIdDTO>): IRequestModel<GetRemoteIdpRequestModel> {
    return {
      requestId: request.id,
      request: request.body
    }
  }
}
