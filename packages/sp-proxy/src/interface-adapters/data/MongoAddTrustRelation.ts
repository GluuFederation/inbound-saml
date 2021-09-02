import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import { Collection } from 'mongodb'

/**
 * Adapter that implements IAddTrGateway using mongo driver
 */
export class MongoAddTrustRelation implements IAddTrGateway {
  constructor(private readonly collection: Collection) {}
  async add(trustRelation: TrustRelation): Promise<boolean> {
    try {
      await this.collection.insertOne({ trustRelation: trustRelation })
      return true
    } catch (err) {
      throw new PersistenceError(
        `Error creating TrustRelation ${JSON.stringify(
          trustRelation.props
        )} in MongoDB: ${(err as Error).name}: ${(err as Error).message}`
      )
    }
  }
}
