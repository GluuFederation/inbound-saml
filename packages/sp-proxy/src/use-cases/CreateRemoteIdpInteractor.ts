import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { AddRemoteIdpRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/AddRemoteIdpRequestUseCaseParams'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/response/SuccessResponseUseCaseParams'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

export class CreateRemoteIdpInteractor
  implements InputBoundary<AddRemoteIdpRequestUseCaseParams>
{
  constructor(
    private readonly gateway: ICreateRemoteIdpGateway,
    private readonly output: OutputBoundary<
      IResponseModel<SuccessResponseUseCaseParams>
    >,
    private readonly entityMapper: IMapper<
      IRequestModel<AddRemoteIdpRequestUseCaseParams>,
      RemoteIdp
    >
  ) {}

  async execute(
    request: IRequestModel<AddRemoteIdpRequestUseCaseParams>
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
