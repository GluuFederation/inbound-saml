import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { RemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'

export class CreateRemoteIdpUseCaseMapper
  implements IMapper<IRequestModel<RemoteIdpUseCaseProps>, RemoteIdp>
{
  map(requestModel: IRequestModel<RemoteIdpUseCaseProps>): RemoteIdp {
    return new RemoteIdp({
      name: requestModel.request.name,
      signingCertificates: requestModel.request.signingCertificates,
      supportedSingleSignOnServices: makeSingleSignOnServices(
        requestModel.request.singleSignOnService
      )
    })
  }
}
