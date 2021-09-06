import { IReadSpProxyConfigRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigRequest'
import { IReadSpProxyConfigResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigResponse'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ISyncFacade } from '@sp-proxy/interface-adapters/protocols/ISyncFacade'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class ReadSpProxyConfigFacade
  implements ISyncFacade<IReadSpProxyConfigRequest, IReadSpProxyConfigResponse>
{
  constructor(
    private readonly eventBus: EventEmitter,
    private readonly controller: IController
  ) {}

  async do(): Promise<IReadSpProxyConfigResponse> {
    const requestId = randomUUID()
    this.eventBus.once(requestId, () => {})
    await this.controller.handle({
      id: requestId,
      body: null
    })
    return 'not impl' as any
  }
}
