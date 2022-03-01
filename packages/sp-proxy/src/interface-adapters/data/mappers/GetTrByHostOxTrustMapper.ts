import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import { TrustRelationDataModel } from '../models/TrustRelationDataModel'

export class GetTrByHostOxtrustMapper
  implements IDataMapper<TrustRelationDataModel, TrustRelation>
{
  async map(dataModel: TrustRelationDataModel): Promise<TrustRelation> {
    return '' as any
  }
}
