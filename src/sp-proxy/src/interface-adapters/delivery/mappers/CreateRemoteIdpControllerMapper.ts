import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { RemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'

export class CreateRemoteIdpControllerMapper
  implements
    IDeliveryMapper<
      IRequest<ICreateRemoteIdpRequest>,
      IRequestModel<RemoteIdpUseCaseProps>
    >
{
  map(
    request: IRequest<ICreateRemoteIdpRequest>
  ): IRequestModel<RemoteIdpUseCaseProps> {
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
