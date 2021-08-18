import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { AddTrFromMetadataUseCaseProps } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseProps'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class AddTrFromMetadataControllerMapper
  implements
    IDeliveryMapper<
      IRequest<IAddTrFromMetadataRequest>,
      IRequestModel<AddTrFromMetadataUseCaseProps>
    >
{
  map(
    requestDto: IRequest<IAddTrFromMetadataRequest>
  ): IRequestModel<AddTrFromMetadataUseCaseProps> {
    return {
      requestId: requestDto.id,
      request: requestDto.body
    }
  }
}
