import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/delivery/dtos/RemoteIdpDeliveryProps'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpMainModel } from '@sp-proxy/use-cases/io-models/main-models/RemoteIdpMainModel'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { EventEmitter } from 'stream'

export class GetRemoteIdpPresenter
  implements OutputBoundary<IResponseModel<RemoteIdpMainModel>>
{
  constructor(
    private readonly dtoMapper: IDeliveryMapper<
      IResponseModel<RemoteIdpMainModel>,
      IResponse<RemoteIdpDeliveryProps>
    >,
    private readonly eventBus: EventEmitter
  ) {}

  async present(response: IResponseModel<RemoteIdpMainModel>): Promise<void> {
    const dto = this.dtoMapper.map(response)
    this.eventBus.emit(dto.requestId, dto)
  }
}
