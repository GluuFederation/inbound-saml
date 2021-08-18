import { OutputBoundary } from '@sp-proxy/use-cases/protocols/OutputBoundary'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/SuccessResponseUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { EventEmitter } from 'stream'

export class CreateRemoteIdpPresenter
  implements OutputBoundary<IResponseModel<SuccessResponseUseCaseParams>>
{
  constructor(private readonly eventBus: EventEmitter) {}

  // TODO: move mapping to external class
  async present(
    response: IResponseModel<SuccessResponseUseCaseParams>
  ): Promise<void> {
    this.eventBus.emit(response.requestId, {
      requestId: response.requestId,
      body: {
        success: response.response.success
      }
    })
  }
}
