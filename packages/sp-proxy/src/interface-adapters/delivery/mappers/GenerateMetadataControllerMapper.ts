import { IGenerateMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { GenerateMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/GenerateMetadataRequestUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class GenerateMetadataControllerMapper
  implements
    IDeliveryMapper<
      IRequest<IGenerateMetadataRequest>,
      IRequestModel<GenerateMetadataRequestUseCaseParams>
    >
{
  map(
    dto: IRequest<IGenerateMetadataRequest>
  ): IRequestModel<GenerateMetadataRequestUseCaseParams> {
    return {
      requestId: dto.id,
      request: 'GenerateSpMetadata'
    }
  }
}
