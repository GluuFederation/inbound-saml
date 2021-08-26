import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { GetTrByHostResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostResponseUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { EventEmitter } from 'stream'

export class GetTrByHostPresenter
  implements OutputBoundary<IResponseModel<GetTrByHostResponseUseCaseParams>>
{
  constructor(
    private readonly dtoMapper: IDeliveryMapper<
      IResponseModel<GetTrByHostResponseUseCaseParams>,
      IResponse<IGetTrByHostResponse>
    >,
    private readonly eventBus: EventEmitter
  ) {}

  async present(
    responseModel: IResponseModel<GetTrByHostResponseUseCaseParams>
  ): Promise<void> {
    this.dtoMapper.map(responseModel)
  }
}
