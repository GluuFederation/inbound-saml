import { GetRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/GetRemoteIdpRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { RemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'
import { IGetRemoteIdpGateway } from '@sp-proxy/use-cases/ports/IGetRemoteIdpGateway'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'

export class GetRemoteIdpInteractor
  implements InputBoundary<GetRemoteIdpRequestModel>
{
  constructor(
    private readonly gateway: IGetRemoteIdpGateway,
    private readonly outputChannel: OutputBoundary<
      IResponseModel<RemoteIdpUseCaseProps>
    >,
    private readonly entityMapper: IMapper<
      RemoteIdp,
      IResponseModel<RemoteIdpUseCaseProps>
    >
  ) {}

  async execute(
    request: IRequestModel<GetRemoteIdpRequestModel>
  ): Promise<void> {
    const remoteIdp = await this.gateway.get(request.request.id)
    const responseModel = this.entityMapper.map(remoteIdp)
    await this.outputChannel.present(responseModel)
  }
}
