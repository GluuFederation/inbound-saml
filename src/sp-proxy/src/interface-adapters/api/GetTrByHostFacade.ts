import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IGetTrByHostFacade } from '@sp-proxy/interface-adapters/protocols/IGetTrByHostFacade'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class GetTrByHostFacade implements IGetTrByHostFacade {
  constructor(
    private readonly controller: IController,
    private readonly eventBus: EventEmitter
  ) {}

  async getTrByHost(host: string): Promise<IGetTrByHostResponse> {
    const requestId = randomUUID()
    this.eventBus.once(requestId, () => {})
    await this.controller.handle({
      id: requestId,
      body: {
        host: host
      }
    })
    return {
      id: '',
      selectedSsoService: {
        binding: '',
        location: ''
      },
      remoteIdp: {
        id: '',
        name: '',
        singleSignOnService: [
          {
            binding: '',
            location: ''
          }
        ],
        signingCertificates: ['']
      }
    }
  }
}
