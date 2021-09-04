import { IReadSpProxyConfigResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigResponse'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { ReadSpProxyConfigResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigResponseUseCaseParams'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { EventEmitter } from 'stream'

export class ReadSpProxyConfigPresenter
  implements
    OutputBoundary<IResponseModel<ReadSpProxyConfigResponseUseCaseParams>>
{
  constructor(
    private readonly mapper: IDeliveryMapper<
      IResponseModel<ReadSpProxyConfigResponseUseCaseParams>,
      IResponse<IReadSpProxyConfigResponse>
    >,
    private readonly eventBus: EventEmitter
  ) {}

  async present(
    responseModel: IResponseModel<ReadSpProxyConfigResponseUseCaseParams>
  ): Promise<void> {
    this.mapper.map(responseModel)
  }
}
