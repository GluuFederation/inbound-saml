import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/SuccessResponseUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { InputBoundary } from '@sp-proxy/use-cases/protocols/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/protocols/OutputBoundary'
import { AddRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'

export class CreateRemoteIdpInteractor
  implements InputBoundary<AddRemoteIdpUseCaseParams>
{
  constructor(
    private readonly gateway: ICreateRemoteIdpGateway,
    private readonly output: OutputBoundary<
      IResponseModel<SuccessResponseUseCaseParams>
    >,
    private readonly entityMapper: IMapper<
      IRequestModel<AddRemoteIdpUseCaseParams>,
      RemoteIdp
    >
  ) {}

  async execute(
    request: IRequestModel<AddRemoteIdpUseCaseParams>
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
