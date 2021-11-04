import { IGenerateMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { GenerateMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/GenerateMetadataRequestUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

export class GenerateMetadataController implements IController {
  constructor(
    private readonly mapper: IDeliveryMapper<
      IRequest<IGenerateMetadataRequest>,
      IRequestModel<GenerateMetadataRequestUseCaseParams>
    >,
    private readonly interactor: InputBoundary<GenerateMetadataRequestUseCaseParams>
  ) {}

  async handle(request: IRequest<IGenerateMetadataRequest>): Promise<void> {
    await this.interactor.execute(this.mapper.map(request))
  }
}
