import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { GetTrByHostResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostResponseUseCaseParams'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { IService } from '@sp-proxy/use-cases/protocols/IService'

export class GetTrByHostUseCaseMapper
  implements IMapper<TrustRelation, GetTrByHostResponseUseCaseParams>
{
  getSsoServices = (remoteIdp: RemoteIdp): IService[] => {
    const ssoServices: IService[] = []
    for (const ssoService of remoteIdp.props.supportedSingleSignOnServices) {
      ssoServices.push(ssoService.props)
    }
    return ssoServices
  }

  map(trustRelation: TrustRelation): GetTrByHostResponseUseCaseParams {
    return {
      id: trustRelation.id,
      selectedSsoService: trustRelation.props.singleSignOnService.props,
      remoteIdp: {
        id: trustRelation.props.remoteIdp.id,
        name: trustRelation.props.remoteIdp.props.name,
        host: trustRelation.props.remoteIdp.props.host,
        singleSignOnService: this.getSsoServices(trustRelation.props.remoteIdp),
        signingCertificates:
          trustRelation.props.remoteIdp.props.signingCertificates
      }
    }
  }
}
