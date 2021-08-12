import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { Collection } from 'mongodb'

export class MongoCreateRemoteIdp implements ICreateRemoteIdpGateway {
  constructor(private readonly collection: Collection) {}
  async create(remoteIdp: RemoteIdp): Promise<boolean> {
    try {
      await this.collection.insertOne({ remoteIdp: remoteIdp })
      return true
    } catch (err) {
      throw new PersistenceError(
        `Error creating RemoteIdp ${JSON.stringify(
          remoteIdp.props
        )} in MongoDB: ${(err as Error).name}: ${(err as Error).message}`
      )
    }
  }
}
