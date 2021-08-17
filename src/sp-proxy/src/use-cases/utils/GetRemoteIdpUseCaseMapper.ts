import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { RemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { IService } from '@sp-proxy/use-cases/protocols/IService'

export class GetRemoteIdpUseCaseMapper
  implements IMapper<RemoteIdp, RemoteIdpUseCaseProps>
{
  map(remoteIdp: RemoteIdp): RemoteIdpUseCaseProps {
    const ssoServices: IService[] = []
    for (const ssoService of remoteIdp.props.supportedSingleSignOnServices) {
      ssoServices.push(ssoService.props)
    }
    return {
      id: remoteIdp.id,
      name: remoteIdp.props.name,
      signingCertificates: remoteIdp.props.signingCertificates,
      singleSignOnService: ssoServices
    }
  }
}
