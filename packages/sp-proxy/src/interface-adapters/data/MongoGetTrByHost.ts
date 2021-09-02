import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import { IGetTrByHostGateway } from '@sp-proxy/use-cases/ports/IGetTrByHostGateway'
import { Collection, Document as MongoDocument } from 'mongodb'

export class MongoGetTrByHost implements IGetTrByHostGateway {
  constructor(
    private readonly collection: Collection,
    private readonly dataMapper: IDataMapper<MongoDocument, TrustRelation>
  ) {}

  async findByHost(host: string): Promise<TrustRelation> {
    try {
      const document = await this.collection.findOne({
        'trustRelation.props.singleSignOnService.props.location': new RegExp(
          host
        )
      })
      if (document == null) {
        throw new Error(`No trust relation containing host ${host} found`)
      }
      return await this.dataMapper.map(document)
    } catch (err) {
      throw new PersistenceError(
        `Error trying to Get Trust Relation by host ${host} in MongoDB: ${
          (err as Error).name
        }: ${(err as Error).message}`
      )
    }
  }
}
