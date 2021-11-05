import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IAddTrFromMetadataRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { AddTrFromMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/AddTrFromMetadataRequestUseCaseParams'

export class AddTrFromMetadataControllerMapper
  implements
    IDeliveryMapper<
      IRequest<IAddTrFromMetadataRequest>,
      IRequestModel<AddTrFromMetadataRequestUseCaseParams>
    >
{
  map(
    requestDto: IRequest<IAddTrFromMetadataRequest>
  ): IRequestModel<AddTrFromMetadataRequestUseCaseParams> {
    return {
      requestId: requestDto.id,
      request: requestDto.body
    }
  }
}
