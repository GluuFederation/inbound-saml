import { GetRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/GetRemoteIdpUseCaseParams'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { RemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'
import { IGetRemoteIdpGateway } from '@sp-proxy/use-cases/ports/IGetRemoteIdpGateway'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'

export class GetRemoteIdpInteractor
  implements InputBoundary<GetRemoteIdpUseCaseParams>
{
  constructor(
    private readonly gateway: IGetRemoteIdpGateway,
    private readonly outputChannel: OutputBoundary<
      IResponseModel<RemoteIdpUseCaseParams>
    >,
    private readonly entityMapper: IMapper<RemoteIdp, RemoteIdpUseCaseParams>
  ) {}

  async execute(
    request: IRequestModel<GetRemoteIdpUseCaseParams>
  ): Promise<void> {
    const remoteIdp = await this.gateway.get(request.request.id)
    const RemoteIdpUseCaseParams = this.entityMapper.map(remoteIdp)
    await this.outputChannel.present({
      requestId: request.requestId,
      response: RemoteIdpUseCaseParams
    })
  }
}
