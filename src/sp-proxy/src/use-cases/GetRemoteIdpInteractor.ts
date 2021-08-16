import { GetRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/GetRemoteIdpRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { RemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'
import { IGetRemoteIdpGateway } from '@sp-proxy/use-cases/ports/IGetRemoteIdpGateway'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class GetRemoteIdpInteractor
  implements InputBoundary<GetRemoteIdpRequestModel>
{
  constructor(
    private readonly gateway: IGetRemoteIdpGateway,
    private readonly outputChannel: OutputBoundary<RemoteIdpUseCaseProps>,
    private readonly entityMapper: IMapper<
      IResponseModel<RemoteIdpUseCaseProps>
    >
  ) {}

  async execute(
    request: IRequestModel<GetRemoteIdpRequestModel>
  ): Promise<void> {
    await this.gateway.get(request.request.id)
  }
}
