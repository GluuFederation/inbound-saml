import { ICreateRemoteIdpOutputBoundary } from '@sp-proxy/use-cases/io-channels/ICreateRemoteIdpOutputBoundary'
import { CreateRemoteIdpResponseModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpResponseModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { EventEmitter } from 'stream'

export class CreateRemoteIdpPresenter
  implements ICreateRemoteIdpOutputBoundary
{
  constructor(private readonly eventBus: EventEmitter) {}

  async present(
    response: IResponseModel<CreateRemoteIdpResponseModel>
  ): Promise<void> {
    this.eventBus.emit(response.requestId, response)
  }
}
