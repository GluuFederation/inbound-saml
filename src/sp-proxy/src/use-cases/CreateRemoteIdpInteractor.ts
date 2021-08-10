import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { ICreateRemoteIdpInputBoundary } from '@sp-proxy/use-cases/io-channels/ICreateRemoteIdpInputBoundary'
import { ICreateRemoteIdpOutputBoundary } from '@sp-proxy/use-cases/io-channels/ICreateRemoteIdpOutputBoundary'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

export class CreateRemoteIdpInteractor
  implements ICreateRemoteIdpInputBoundary
{
  constructor(
    private readonly gateway: ICreateRemoteIdpGateway,
    private readonly output: ICreateRemoteIdpOutputBoundary,
    private readonly entityMapper: IMapper<RemoteIdp>
  ) {}

  async execute(
    request: IRequestModel<CreateRemoteIdpRequestModel>
  ): Promise<void> {
    const mapped = this.entityMapper.map(request)
    const success = await this.gateway.create(mapped)
    this.output.present({
      requestId: request.requestId,
      response: {
        success
      }
    })
  }
}
