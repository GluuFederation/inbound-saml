import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { CreateRemoteIdpResponseModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpResponseModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { EventEmitter } from 'stream'

export class CreateRemoteIdpPresenter
  implements OutputBoundary<IResponseModel<CreateRemoteIdpResponseModel>>
{
  constructor(private readonly eventBus: EventEmitter) {}

  // TODO: move mapping to external class
  async present(
    response: IResponseModel<CreateRemoteIdpResponseModel>
  ): Promise<void> {
    this.eventBus.emit(response.requestId, {
      requestId: response.requestId,
      body: {
        success: response.response.success
      }
    })
  }
}
