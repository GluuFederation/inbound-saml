import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { AddTrFromMetadataUseCaseProps } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseProps'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseModel } from '@sp-proxy/use-cases/io-models/SuccessResponseModel'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { IFetchExternalDataGateway } from '@sp-proxy/use-cases/ports/IFetchExternalDataGateway'

export class AddTrFromMetadataInteractor
  implements InputBoundary<AddTrFromMetadataUseCaseProps>
{
  constructor(
    private readonly externalDataGateway: IFetchExternalDataGateway,
    private readonly createRemoteIdpGateway: ICreateRemoteIdpGateway,
    private readonly addTrGateeay: IAddTrGateway,
    private readonly outputChannel: OutputBoundary<
      IResponseModel<SuccessResponseModel>
    >
  ) {}

  async execute(
    request: IRequestModel<AddTrFromMetadataUseCaseProps>
  ): Promise<void> {
    await this.externalDataGateway.fetch(request.request.url)
  }
}
