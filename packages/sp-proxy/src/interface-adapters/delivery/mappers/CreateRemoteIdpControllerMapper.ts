import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/dtos/ICreateRemoteIdpRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { AddRemoteIdpRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/AddRemoteIdpRequestUseCaseParams'

export class CreateRemoteIdpControllerMapper
  implements
    IDeliveryMapper<
      IRequest<ICreateRemoteIdpRequest>,
      IRequestModel<AddRemoteIdpRequestUseCaseParams>
    >
{
  map(
    request: IRequest<ICreateRemoteIdpRequest>
  ): IRequestModel<AddRemoteIdpRequestUseCaseParams> {
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
