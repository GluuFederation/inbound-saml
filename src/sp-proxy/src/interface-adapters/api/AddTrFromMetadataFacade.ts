import { IAddTrFromMetadataFacade } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataFacade'
import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class AddTrFromMetadataFacade implements IAddTrFromMetadataFacade {
  constructor(
    private readonly controller: IController,
    private readonly eventBus: EventEmitter
  ) {}

  async addTrFromMetadata(params: IAddTrFromMetadataRequest): Promise<boolean> {
    const requestId = randomUUID()
    this.eventBus.once(requestId, () => {})
    return true
  }
}
