import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { RemoteIdpFromExternalParams } from '@sp-proxy/use-cases/factories/RemoteIdpFromExternalDataFactory'
import { TrustRelationWithDefaultsParams } from '@sp-proxy/use-cases/factories/TrustRelationWithDefaultFactory'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { AddTrFromMetadataUseCaseProps } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseProps'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseModel } from '@sp-proxy/use-cases/io-models/SuccessResponseModel'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { IFetchExternalDataGateway } from '@sp-proxy/use-cases/ports/IFetchExternalDataGateway'
import { IFactory } from '@sp-proxy/use-cases/protocols/IFactory'

/**
 * Interactor responsible for:
 *  - fetching metadata from Url
 *  - persist new `RemoteIdp` entity
 *  - persist new `TrustRelation` entity *
 */
export class AddTrFromMetadataInteractor
  implements InputBoundary<AddTrFromMetadataUseCaseProps>
{
  constructor(
    // TODO: validate if TR singleSignOnService is one of the availables in RemoteIdp
    private readonly externalDataGateway: IFetchExternalDataGateway,
    private readonly remoteIdpFromExtDataFactory: IFactory<
      RemoteIdpFromExternalParams,
      RemoteIdp
    >,
    private readonly createRemoteIdpGateway: ICreateRemoteIdpGateway,
    private readonly trWithDefaultFactory: IFactory<
      TrustRelationWithDefaultsParams,
      TrustRelation
    >,
    private readonly addTrGateeay: IAddTrGateway,
    private readonly outputChannel: OutputBoundary<
      IResponseModel<SuccessResponseModel>
    >
  ) {}

  /**
   * Command to execute usecase request received by controller
   * Calls presenter with IResponseModel
   * @param {IRequestModel<AddTrFromMetadataUseCaseProps>} request
   * @return {*}  {Promise<void>}
   * @memberof AddTrFromMetadataInteractor
   */
  async execute(
    request: IRequestModel<AddTrFromMetadataUseCaseProps>
  ): Promise<void> {
    const externalData = await this.externalDataGateway.fetch(
      request.request.url
    )

    const remoteIdp = await this.remoteIdpFromExtDataFactory.make({
      externalData: externalData,
      name: request.request.name
    })

    await this.createRemoteIdpGateway.create(remoteIdp)

    const trustRelation = await this.trWithDefaultFactory.make({
      remoteIdp: remoteIdp
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
