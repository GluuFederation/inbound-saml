import { IAddTrFromMetadataFacade } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataFacade'
import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { SuccessResponseModel } from '@sp-proxy/use-cases/io-models/SuccessResponseModel'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class AddTrFromMetadataFacade implements IAddTrFromMetadataFacade {
  constructor(
    private readonly controller: IController,
    private readonly eventBus: EventEmitter
  ) {}

  async addTrFromMetadata(
    params: IAddTrFromMetadataRequest
  ): Promise<SuccessResponseModel> {
    const requestId = randomUUID()
    const result: SuccessResponseModel[] = []
    this.eventBus.once(requestId, (response) => {
      result.push(response.response)
    })
    await this.controller.handle({
      id: requestId,
      body: params
    })
    console.log(result)
    return result[0]
  }
}
