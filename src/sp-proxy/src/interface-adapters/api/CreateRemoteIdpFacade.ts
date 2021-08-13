import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ICreateRemoteIdpFacade } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpFacade'
import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { ICreateRemoteIdpResponse } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpResponse'
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
    await this.controller.handle({
      id: requestId,
      body: props
    })
    this.eventBus.once(requestId, () => {})
    return { success: true }
  }
}
