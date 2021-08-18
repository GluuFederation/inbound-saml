import { IAddTrFromMetadataResponse } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataResponse'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseModel } from '@sp-proxy/use-cases/io-models/SuccessResponseModel'
import { EventEmitter } from 'stream'

export class AddTrFromMetadataPresenter
  implements OutputBoundary<IResponseModel<SuccessResponseModel>>
{
  constructor(
    private readonly dtoMapper: IDeliveryMapper<
      IResponseModel<SuccessResponseModel>,
      IResponse<IAddTrFromMetadataResponse>
    >,
    private readonly eventBus: EventEmitter
  ) {}

  async present(response: IResponseModel<SuccessResponseModel>): Promise<void> {
    this.dtoMapper.map(response)
  }
}
