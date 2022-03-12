import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import { SingleSignOnServicesDataModel } from '../models/SingleSignOnServicesDataModel'
import { TrustRelationDataModel } from '../models/TrustRelationDataModel'

export class AddTrustRelationOxTrustMapper
  implements IDataMapper<TrustRelation, TrustRelationDataModel>
{
  getSsoServices = (remoteIdp: RemoteIdp): SingleSignOnServicesDataModel[] => {
    const ssoServices: SingleSignOnServicesDataModel[] = []
    for (const ssoService of remoteIdp.props.supportedSingleSignOnServices) {
      ssoServices.push(ssoService.props)
    }
    return ssoServices
  }

  async map(
    trustRelationEntity: TrustRelation
  ): Promise<TrustRelationDataModel.Params> {
    const dataModel: TrustRelationDataModel.Params = {
      remoteIdp: {
        name: trustRelationEntity.props.remoteIdp.props.name,
        host: trustRelationEntity.props.remoteIdp.props.host,
        supportedSingleSignOnServices: this.getSsoServices(
          trustRelationEntity.props.remoteIdp
        ),
        signingCertificates:
          trustRelationEntity.props.remoteIdp.props.signingCertificates,
        id: trustRelationEntity.id
      },
      selectedSingleSignOnService:
        trustRelationEntity.props.singleSignOnService.props
    }
    return dataModel
  }
}
