import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { AddTrFromMetadataUseCaseParams } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class AddTrFromMetadataControllerMapper
  implements
    IDeliveryMapper<
      IRequest<IAddTrFromMetadataRequest>,
      IRequestModel<AddTrFromMetadataUseCaseParams>
    >
{
  map(
    requestDto: IRequest<IAddTrFromMetadataRequest>
  ): IRequestModel<AddTrFromMetadataUseCaseParams> {
    return {
      requestId: requestDto.id,
      request: requestDto.body
    }
  }
}
