import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { AddRemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'

export class CreateRemoteIdpControllerMapper
  implements
    IDeliveryMapper<
      IRequest<ICreateRemoteIdpRequest>,
      IRequestModel<AddRemoteIdpUseCaseProps>
    >
{
  map(
    request: IRequest<ICreateRemoteIdpRequest>
  ): IRequestModel<AddRemoteIdpUseCaseProps> {
    return {
      requestId: request.id,
      request: {
        name: request.body.name,
        // TODO: do deeper array mapping
        singleSignOnService: request.body.singleSignOnService,
        signingCertificates: request.body.signingCertificates
      }
    }
  }
}
