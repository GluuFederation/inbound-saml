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
    const result: IGetTrByHostResponse[] = []
    this.eventBus.once(requestId, (responseDto) =>
      result.push(responseDto.body)
    )
    await this.controller.handle({
      id: requestId,
      body: {
        host
      }
    })
    return result[0]
  }
}
