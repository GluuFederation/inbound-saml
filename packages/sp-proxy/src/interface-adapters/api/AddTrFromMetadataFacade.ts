import { IAddTrFromMetadataFacade } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataFacade'
import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IAddTrFromMetadataRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/response/SuccessResponseUseCaseParams'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class AddTrFromMetadataFacade implements IAddTrFromMetadataFacade {
  constructor(
    private readonly controller: IController,
    private readonly eventBus: EventEmitter
  ) {}

  async addTrFromMetadata(
    params: IAddTrFromMetadataRequest
  ): Promise<SuccessResponseUseCaseParams> {
    const requestId = randomUUID()
    const result: SuccessResponseUseCaseParams[] = []
    this.eventBus.once(requestId, (response) => {
      result.push(response.body)
    })
    await this.controller.handle({
      id: requestId,
      body: params
    })
    return result[0]
  }
}
