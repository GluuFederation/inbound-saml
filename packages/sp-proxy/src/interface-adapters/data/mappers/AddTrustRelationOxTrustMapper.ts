import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import { TrustRelationDataModel } from '../models/TrustRelationDataModel'

export class AddTrustRelationOxTrustMapper
  implements IDataMapper<TrustRelation, TrustRelationDataModel>
{
  async map(
    trustRelationEntity: TrustRelation
  ): Promise<TrustRelationDataModel> {
    const dataModel: TrustRelationDataModel = {
      remoteIdp: {
        name: trustRelationEntity.props.remoteIdp.props.name,
        host: trustRelationEntity.props.remoteIdp.props.host,
        supportedSingleSignOnServices: [
          trustRelationEntity.props.remoteIdp.props
            .supportedSingleSignOnServices[0].props
        ],
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
