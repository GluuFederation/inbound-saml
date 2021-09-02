import { GetByIdDTO } from '@sp-proxy/interface-adapters/delivery/dtos/GetByIdDTO'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { GetRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/GetRemoteIdpUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class GetRemoteIdpControllerMapper
  implements
    IDeliveryMapper<
      IRequest<GetByIdDTO>,
      IRequestModel<GetRemoteIdpUseCaseParams>
    >
{
  map(request: IRequest<GetByIdDTO>): IRequestModel<GetRemoteIdpUseCaseParams> {
    return {
      requestId: request.id,
      request: request.body
    }
  }
}
