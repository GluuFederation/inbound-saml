import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

export class CreateRemoteIdpMapper implements IMapper<RemoteIdp> {
  map(requestModel: IRequestModel<CreateRemoteIdpRequestModel>): RemoteIdp {
    return new RemoteIdp({
      name: requestModel.request.name,
      signingCertificates: requestModel.request.signingCertificates,
      supportedSingleSignOnServices: makeSingleSignOnServices(
        requestModel.request.singleSignOnService
      )
    })
  }
}
