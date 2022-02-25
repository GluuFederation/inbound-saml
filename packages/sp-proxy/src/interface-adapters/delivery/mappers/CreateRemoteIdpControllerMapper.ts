import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/dtos/ICreateRemoteIdpRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { AddRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'

export class CreateRemoteIdpControllerMapper
  implements
    IDeliveryMapper<
      IRequest<ICreateRemoteIdpRequest>,
      IRequestModel<AddRemoteIdpUseCaseParams>
    >
{
  map(
    request: IRequest<ICreateRemoteIdpRequest>
  ): IRequestModel<AddRemoteIdpUseCaseParams> {
    return {
      requestId: request.id,
      request: {
        name: request.body.name,
        host: request.body.host,
        // TODO: do deeper array mapping
        singleSignOnService: request.body.singleSignOnService,
        signingCertificates: request.body.signingCertificates
      }
    }
  }
}
