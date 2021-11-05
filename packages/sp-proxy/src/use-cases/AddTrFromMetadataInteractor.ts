import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { RemoteIdpFromExternalParams } from '@sp-proxy/use-cases/factories/RemoteIdpFromExternalDataFactory'
import { TrustRelationWithDefaultsParams } from '@sp-proxy/use-cases/factories/TrustRelationWithDefaultFactory'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { AddTrFromMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/AddTrFromMetadataRequestUseCaseParams'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/response/SuccessResponseUseCaseParams'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
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
  implements InputBoundary<AddTrFromMetadataRequestUseCaseParams>
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
      IResponseModel<SuccessResponseUseCaseParams>
    >
  ) {}

  /**
   * Command to execute usecase request received by controller
   * Calls presenter with IResponseModel
   * @param {IRequestModel<AddTrFromMetadataRequestUseCaseParams>} request
   * @return {*}  {Promise<void>}
   * @memberof AddTrFromMetadataInteractor
   */
  async execute(
    request: IRequestModel<AddTrFromMetadataRequestUseCaseParams>
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
