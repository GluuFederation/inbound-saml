import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { AddRemoteIdpRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/AddRemoteIdpRequestUseCaseParams'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

export class CreateRemoteIdpUseCaseMapper
  implements
    IMapper<IRequestModel<AddRemoteIdpRequestUseCaseParams>, RemoteIdp>
{
  map(
    requestModel: IRequestModel<AddRemoteIdpRequestUseCaseParams>
  ): RemoteIdp {
    return new RemoteIdp({
      name: requestModel.request.name,
      signingCertificates: requestModel.request.signingCertificates,
      supportedSingleSignOnServices: makeSingleSignOnServices(
        requestModel.request.singleSignOnService
      )
    })
  }
}
