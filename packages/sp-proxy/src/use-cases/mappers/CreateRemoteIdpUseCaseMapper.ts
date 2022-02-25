import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { AddRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

export class CreateRemoteIdpUseCaseMapper
  implements IMapper<IRequestModel<AddRemoteIdpUseCaseParams>, RemoteIdp>
{
  map(requestModel: IRequestModel<AddRemoteIdpUseCaseParams>): RemoteIdp {
    return new RemoteIdp({
      name: requestModel.request.name,
      host: requestModel.request.host,
      signingCertificates: requestModel.request.signingCertificates,
      supportedSingleSignOnServices: makeSingleSignOnServices(
        requestModel.request.singleSignOnService
      )
    })
  }
}
