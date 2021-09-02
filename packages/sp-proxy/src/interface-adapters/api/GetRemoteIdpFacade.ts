import { GetByIdDTO } from '@sp-proxy/interface-adapters/delivery/dtos/GetByIdDTO'
import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/delivery/dtos/RemoteIdpDeliveryProps'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IGetRemoteIdpFacade } from '@sp-proxy/interface-adapters/protocols/IGetRemoteIdpFacade'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'stream'

export class GetRemoteIdpFacade implements IGetRemoteIdpFacade {
  constructor(
    private readonly controller: IController,
    private readonly eventBus: EventEmitter
  ) {}

  async getRemoteIdp(id: string): Promise<RemoteIdpDeliveryProps> {
    const requestId = randomUUID()
    const result: RemoteIdpDeliveryProps[] = []
    this.eventBus.once(
      requestId,
      (response: IResponse<RemoteIdpDeliveryProps>) => {
        result.push(response.body)
      }
    )
    const request: IRequest<GetByIdDTO> = {
      id: requestId,
      body: {
        id: id
      }
    }
    await this.controller.handle(request)
    return result[0]
  }
}
