import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/SuccessResponseUseCaseParams'
import { EventEmitter } from 'stream'
import { IAddTrFromMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IAddTrFromMetadataResponse'

export class AddTrFromMetadataPresenter
  implements OutputBoundary<IResponseModel<SuccessResponseUseCaseParams>>
{
  constructor(
    private readonly dtoMapper: IDeliveryMapper<
      IResponseModel<SuccessResponseUseCaseParams>,
      IResponse<IAddTrFromMetadataResponse>
    >,
    private readonly eventBus: EventEmitter
  ) {}

  async present(
    response: IResponseModel<SuccessResponseUseCaseParams>
  ): Promise<void> {
    const responseModel = this.dtoMapper.map(response)
    this.eventBus.emit(response.requestId, responseModel)
  }
}
