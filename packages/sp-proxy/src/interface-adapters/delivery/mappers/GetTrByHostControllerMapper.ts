import { IGetTrByHostRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { GetTrByHostRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostRequestUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class GetTrByHostControllerMapper
  implements
    IDeliveryMapper<
      IRequest<IGetTrByHostRequest>,
      IRequestModel<GetTrByHostRequestUseCaseParams>
    >
{
  map(
    requestDto: IRequest<IGetTrByHostRequest>
  ): IRequestModel<GetTrByHostRequestUseCaseParams> {
    return {
      requestId: requestDto.id,
      request: {
        host: requestDto.body.host
      }
    }
  }
}
