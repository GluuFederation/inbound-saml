import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IGetRemoteIdpFacade } from '@sp-proxy/interface-adapters/protocols/IGetRemoteIdpFacade'
import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/protocols/RemoteIdpDeliveryProps'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class GetRemoteIdpFacade implements IGetRemoteIdpFacade {
  constructor(
    private readonly controller: IController,
    private readonly eventBus: EventEmitter
  ) {}

  async getRemoteIdp(id: string): Promise<RemoteIdpDeliveryProps> {
    const requestId = randomUUID()
    this.eventBus.once(requestId, () => {})
    // stub to impl interface during tests
    return {
      id: 'any',
      name: 'any',
      signingCertificates: ['any'],
      singleSignOnService: [{ binding: 'any', location: 'any' }]
    }
  }
}
