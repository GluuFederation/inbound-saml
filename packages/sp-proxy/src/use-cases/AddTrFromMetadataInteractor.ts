import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { RemoteIdpFromExternalParams } from '@sp-proxy/use-cases/factories/RemoteIdpFromExternalDataFactory'
import { TrustRelationWithDefaultsParams } from '@sp-proxy/use-cases/factories/TrustRelationWithDefaultFactory'
import { AddTrFromMetadataUseCaseParams } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/SuccessResponseUseCaseParams'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import { IFetchExternalDataGateway } from '@sp-proxy/use-cases/ports/IFetchExternalDataGateway'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { IFactory } from '@sp-proxy/use-cases/protocols/IFactory'

/**
 * Interactor responsible for:
 *  - fetching metadata from Url
 *  - persist new `RemoteIdp` entity
 *  - persist new `TrustRelation` entity *
 */
export class AddTrFromMetadataInteractor
  implements InputBoundary<AddTrFromMetadataUseCaseParams>
{
  constructor(
    // TODO: validate if TR singleSignOnService is one of the availables in RemoteIdp
    private readonly externalDataGateway: IFetchExternalDataGateway,
    private readonly remoteIdpFromExtDataFactory: IFactory<
      RemoteIdpFromExternalParams,
      RemoteIdp
    >,
    private readonly trWithDefaultFactory: IFactory<
      TrustRelationWithDefaultsParams,
      TrustRelation
    >,
    private readonly addTrGateeay: IAddTrGateway,
    private readonly outputChannel: OutputBoundary<
      IResponseModel<SuccessResponseUseCaseParams>
    >
  ) {}

  /**
   * Command to execute usecase request received by controller
   * Calls presenter with IResponseModel
   * @param {IRequestModel<AddTrFromMetadataUseCaseParams>} request
   * @return {*}  {Promise<void>}
   * @memberof AddTrFromMetadataInteractor
   */
  async execute(
    request: IRequestModel<AddTrFromMetadataUseCaseParams>
  ): Promise<void> {
    const externalData = await this.externalDataGateway.fetch(
      request.request.url
    )
    const remoteIdp = await this.remoteIdpFromExtDataFactory.make({
      externalData,
      name: request.request.name,
      host: request.request.host
    })

    const trustRelation = await this.trWithDefaultFactory.make({
      remoteIdp
    })
    await this.addTrGateeay.add(trustRelation)
    await this.outputChannel.present({
      requestId: request.requestId,
      response: {
        success: true
      }
    })
  }
}
