import { IReadSpProxyConfigRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { ReadSpProxyConfigRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/ReadSpProxyConfigRequestUseCaseParams'

export class ReadSpProxyConfigControllerMapper
  implements
    IDeliveryMapper<
      IRequest<IReadSpProxyConfigRequest>,
      IRequestModel<ReadSpProxyConfigRequestUseCaseParams>
    >
{
  map(
    requestDto: IRequest<IReadSpProxyConfigRequest>
  ): IRequestModel<ReadSpProxyConfigRequestUseCaseParams> {
    return {
      requestId: requestDto.id,
      request: requestDto.body
    }
  }
}
