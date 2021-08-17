import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
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
 *  - persist new `TrustRelation` entity
 */
export class AddTrFromMetadataInteractor
  implements InputBoundary<AddTrFromMetadataUseCaseProps>
{
  /**
   * Creates new interactor to add TrustRelation from Metadata
   * @param externalDataGateway: IFetchExternalDataGateway - metadata fetcher impl
   * @param createRemoteIdpGateway: ICreateRemoteIdpGateway
   * @param addTrGateeay: IAddTrGateway
   * @param outputChannel: OutputBoundary
   */
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
   * @param request: IRequestModel
   */
  async execute(
    request: IRequestModel<AddTrFromMetadataUseCaseProps>
  ): Promise<void> {
    const externalData = await this.externalDataGateway.fetch(
      request.request.url
    )
    const remoteIdpId = randomUUID()
    const remoteIdp = new RemoteIdp(
      {
        name: request.request.name,
        supportedSingleSignOnServices: makeSingleSignOnServices(
          externalData.singleSignOnServices
        ),
        signingCertificates: externalData.idpSigningCert
      },
      remoteIdpId
    )
    await this.createRemoteIdpGateway.create(remoteIdp)
    await this.addTrGateeay.add(
      new TrustRelation({
        remoteIdp: remoteIdp,
        singleSignOnService: makeSingleSignOnService(
          externalData.singleSignOnServices[0]
        )
      })
    )
    await this.outputChannel.present({
      requestId: request.requestId,
      response: {
        success: true
      }
    })
  }
}
