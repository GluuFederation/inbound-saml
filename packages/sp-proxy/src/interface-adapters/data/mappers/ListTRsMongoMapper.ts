import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import { Document as MongoDocument } from 'mongodb'
import { GetTRMongoMapper } from './GetTRMongoMapper'

export class ListTRsMongoMapper
  implements IDataMapper<MongoDocument[], TrustRelation[]>
{
  async map(mappedFrom: MongoDocument[]): Promise<TrustRelation[]> {
    const getTRMongoMapper = new GetTRMongoMapper()
    const trustRelations: TrustRelation[] = []
    for (const document of mappedFrom) {
      trustRelations.push(await getTRMongoMapper.map(document))
    }
    return trustRelations
  }
}
