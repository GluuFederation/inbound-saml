import { makeRemoteIdpFromExternalData } from '@sp-proxy/use-cases/factories/makeRemoteIdpFromExternalData'
import { makeTrustRelationWithDefault } from '@sp-proxy/use-cases/factories/makeTrustRelationWithDefault'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/io-channels/OutputBoundary'
import { AddTrFromMetadataUseCaseProps } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseProps'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseModel } from '@sp-proxy/use-cases/io-models/SuccessResponseModel'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { IFetchExternalDataGateway } from '@sp-proxy/use-cases/ports/IFetchExternalDataGateway'
import { randomUUID } from 'crypto'

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
    private readonly externalDataGateway: IFetchExternalDataGateway,
    private readonly createRemoteIdpGateway: ICreateRemoteIdpGateway,
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
    // create new remote idp from external data
    const remoteIdpId = randomUUID()
    const remoteIdp = makeRemoteIdpFromExternalData(
      externalData,
      request.request.name,
      remoteIdpId
    )

    await this.createRemoteIdpGateway.create(remoteIdp)

    const trustRelation = makeTrustRelationWithDefault(remoteIdp)
    await this.addTrGateeay.add(trustRelation)

    await this.outputChannel.present({
      requestId: request.requestId,
      response: {
        success: true
      }
    })
  }
}
