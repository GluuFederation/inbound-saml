import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IListTRsGateway } from '@sp-proxy/use-cases/ports/IListTRsGateway'
import { Collection, Document as MongoDocument } from 'mongodb'
import { IDataMapper } from '../protocols/IDataMapper'
import { PersistenceError } from './errors/PersistenceError'

export class MongoListTRs implements IListTRsGateway {
  constructor(
    private readonly mongoCollection: Collection,
    private readonly dataMapper: IDataMapper<MongoDocument[], TrustRelation[]>
  ) {}

  async findAll(): Promise<TrustRelation[]> {
    try {
      const documents = await this.mongoCollection.find().toArray()
      await this.dataMapper.map(documents)
    } catch (err) {
      throw new PersistenceError(
        'An error ocurred while fetching all TRs from persistence'
      )
    }
    return '' as any
  }
}
