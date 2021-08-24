import { IController } from '@get-saml-metadata/interface-adapters/delivery/protocols/IController'
import { IGenerateMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataResponse'
import { IGenerateMetadataFacade } from '@sp-proxy/interface-adapters/protocols/IGenerateMetadataFacade'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class GenerateMetadataFacade implements IGenerateMetadataFacade {
  constructor(
    private readonly controller: IController,
    private readonly eventBus: EventEmitter
  ) {}

  async generateMetadata(): Promise<IGenerateMetadataResponse> {
    const requestId = randomUUID()
    this.eventBus.once(requestId, () => {
      return ''
    })
    return {
      metadata: ''
    }
  }
}
