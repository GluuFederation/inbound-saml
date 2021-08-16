import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/protocols/RemoteIdpDeliveryProps'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'
import { EventEmitter } from 'stream'

export class GetRemoteIdpPresenter
  implements OutputBoundary<RemoteIdpUseCaseProps>
{
  constructor(
    private readonly dtoMapper: IDeliveryMapper<
      IResponseModel<RemoteIdpUseCaseProps>,
      IResponse<RemoteIdpDeliveryProps>
    >,
    private readonly eventBus: EventEmitter
  ) {}

  async present(
    response: IResponseModel<RemoteIdpUseCaseProps>
  ): Promise<void> {
    const dto = this.dtoMapper.map(response)
    this.eventBus.emit(dto.requestId, dto.body)
  }
}
