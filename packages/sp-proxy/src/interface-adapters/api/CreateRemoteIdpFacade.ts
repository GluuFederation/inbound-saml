import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/dtos/ICreateRemoteIdpRequest'
import { ICreateRemoteIdpResponse } from '@sp-proxy/interface-adapters/delivery/dtos/ICreateRemoteIdpResponse'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ICreateRemoteIdpFacade } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpFacade'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class CreateRemoteIdpFacade implements ICreateRemoteIdpFacade {
  constructor(
    private readonly controller: IController,
    private readonly eventBus: EventEmitter
  ) {}

  async createRemoteIdp(
    props: ICreateRemoteIdpRequest
  ): Promise<ICreateRemoteIdpResponse> {
    // TODO: move mapper to external Mapper class
    const requestId = randomUUID()
    const result: ICreateRemoteIdpResponse[] = []
    this.eventBus.once(
      requestId,
      (response: IResponse<ICreateRemoteIdpResponse>) => {
        result.push(response.body)
      }
    )
    const request: IRequest<ICreateRemoteIdpRequest> = {
      id: requestId,
      body: props
    }
    await this.controller.handle(request)
    return result[0]
  }
}
