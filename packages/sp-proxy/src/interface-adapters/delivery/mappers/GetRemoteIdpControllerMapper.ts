import { GetByIdDTO } from '@sp-proxy/interface-adapters/delivery/dtos/GetByIdDTO'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { GetRemoteIdpRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/GetRemoteIdpRequestUseCaseParams'

export class GetRemoteIdpControllerMapper
  implements
    IDeliveryMapper<
      IRequest<GetByIdDTO>,
      IRequestModel<GetRemoteIdpRequestUseCaseParams>
    >
{
  map(
    request: IRequest<GetByIdDTO>
  ): IRequestModel<GetRemoteIdpRequestUseCaseParams> {
    return {
      requestId: request.id,
      request: request.body
    }
  }
}
