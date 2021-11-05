import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { GetTrByHostRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/GetTrByHostRequestUseCaseParams'
import { GetTrByHostResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/response/GetTrByHostResponseUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IGetTrByHostGateway } from '@sp-proxy/use-cases/ports/IGetTrByHostGateway'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

export class GetTrByHostInteractor
  implements InputBoundary<GetTrByHostRequestUseCaseParams>
{
  constructor(
    private readonly gateway: IGetTrByHostGateway,
    private readonly mapper: IMapper<
      TrustRelation,
      GetTrByHostResponseUseCaseParams
    >,
    private readonly outputChannel: OutputBoundary<
      IResponseModel<GetTrByHostResponseUseCaseParams>
    >
  ) {}

  async execute(
    requestModel: IRequestModel<GetTrByHostRequestUseCaseParams>
  ): Promise<void> {
    const trustRelation = await this.gateway.findByHost(
      requestModel.request.host
    )
    const responseParams = this.mapper.map(trustRelation)
    await this.outputChannel.present({
      requestId: requestModel.requestId,
      response: responseParams
    })
  }
}
