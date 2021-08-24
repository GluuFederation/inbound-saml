import { IGenerateMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataResponse'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IGenerateMetadataFacade } from '@sp-proxy/interface-adapters/protocols/IGenerateMetadataFacade'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class GenerateMetadataFacade implements IGenerateMetadataFacade {
  constructor(
    private readonly controller: IController,
    private readonly eventBus: EventEmitter
  ) {}

  async generateMetadata(): Promise<IGenerateMetadataResponse> {
    const requestId = randomUUID()
    const response: IGenerateMetadataResponse[] = []
    this.eventBus.once(
      requestId,
      (result: IResponse<IGenerateMetadataResponse>) => {
        response.push(result.body)
      }
    )
    await this.controller.handle({
      id: requestId,
      body: 'generate metadata request'
    })
    return response[0]
  }
}
