import { IGenerateMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataResponse'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataResponseUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { EventEmitter } from 'stream'
export class GenerateMetadataPresenter
  implements
    OutputBoundary<IResponseModel<GenerateMetadataResponseUseCaseParams>>
{
  constructor(
    private readonly mapper: IDeliveryMapper<
      IResponseModel<GenerateMetadataResponseUseCaseParams>,
      IResponse<IGenerateMetadataResponse>
    >,
    private readonly eventBus: EventEmitter
  ) {}

  async present(
    responseModel: IResponseModel<GenerateMetadataResponseUseCaseParams>
  ): Promise<void> {
    this.mapper.map(responseModel)
  }
}
