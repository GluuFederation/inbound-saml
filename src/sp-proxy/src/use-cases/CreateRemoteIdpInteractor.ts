import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { CreateRemoteIdpResponseModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpResponseModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'

export class CreateRemoteIdpInteractor
  implements InputBoundary<CreateRemoteIdpRequestModel>
{
  constructor(
    private readonly gateway: ICreateRemoteIdpGateway,
    private readonly output: OutputBoundary<CreateRemoteIdpResponseModel>,
    private readonly entityMapper: IMapper<RemoteIdp>
  ) {}

  async execute(
    request: IRequestModel<CreateRemoteIdpRequestModel>
  ): Promise<void> {
    const mapped = this.entityMapper.map(request)
    const success = await this.gateway.create(mapped)
    await this.output.present({
      requestId: request.requestId,
      response: {
        success
      }
    })
  }
}
