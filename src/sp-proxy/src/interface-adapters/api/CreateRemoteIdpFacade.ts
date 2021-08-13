import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ICreateRemoteIdpFacade } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpFacade'
import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { ICreateRemoteIdpResponse } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpResponse'
import { randomUUID } from 'crypto'

export class CreateRemoteIdpFacade implements ICreateRemoteIdpFacade {
  constructor(private readonly controller: IController) {}
  async createRemoteIdp(
    props: ICreateRemoteIdpRequest
  ): Promise<ICreateRemoteIdpResponse> {
    const requestId = randomUUID()
    await this.controller.handle({
      id: requestId,
      body: props
    })
    return { success: true }
  }
}
