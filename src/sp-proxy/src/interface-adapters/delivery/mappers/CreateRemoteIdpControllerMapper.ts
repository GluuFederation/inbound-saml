import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { IMapper } from '@sp-proxy/interface-adapters/protocols/IMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class CreateRemoteIdpControllerMapper
  implements IMapper<ICreateRemoteIdpRequest, CreateRemoteIdpRequestModel>
{
  map(
    request: IRequest<ICreateRemoteIdpRequest>
  ): IRequestModel<CreateRemoteIdpRequestModel> {
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
