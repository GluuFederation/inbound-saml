import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpMainModel } from '@sp-proxy/use-cases/io-models/main-models/RemoteIdpMainModel'
import { GetRemoteIdpRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/GetRemoteIdpRequestUseCaseParams'
import { IGetRemoteIdpGateway } from '@sp-proxy/use-cases/ports/IGetRemoteIdpGateway'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

export class GetRemoteIdpInteractor
  implements InputBoundary<GetRemoteIdpRequestUseCaseParams>
{
  constructor(
    private readonly gateway: IGetRemoteIdpGateway,
    private readonly outputChannel: OutputBoundary<
      IResponseModel<RemoteIdpMainModel>
    >,
    private readonly entityMapper: IMapper<RemoteIdp, RemoteIdpMainModel>
  ) {}

  async execute(
    request: IRequestModel<GetRemoteIdpRequestUseCaseParams>
  ): Promise<void> {
    const remoteIdp = await this.gateway.get(request.request.id)
    const RemoteIdpMainModel = this.entityMapper.map(remoteIdp)
    await this.outputChannel.present({
      requestId: request.requestId,
      response: RemoteIdpMainModel
    })
  }
}
