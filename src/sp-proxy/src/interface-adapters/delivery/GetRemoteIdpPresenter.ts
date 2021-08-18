import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/protocols/RemoteIdpDeliveryProps'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'
import { EventEmitter } from 'stream'

export class GetRemoteIdpPresenter
  implements OutputBoundary<IResponseModel<RemoteIdpUseCaseParams>>
{
  constructor(
    private readonly dtoMapper: IDeliveryMapper<
      IResponseModel<RemoteIdpUseCaseParams>,
      IResponse<RemoteIdpDeliveryProps>
    >,
    private readonly eventBus: EventEmitter
  ) {}

  async present(
    response: IResponseModel<RemoteIdpUseCaseParams>
  ): Promise<void> {
    const dto = this.dtoMapper.map(response)
    this.eventBus.emit(dto.requestId, dto)
  }
}
