import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { Collection } from 'mongodb'

export class MongoCreateRemoteIdp implements ICreateRemoteIdpGateway {
  constructor(private readonly collection: Collection) {}
  async create(remoteIdp: RemoteIdp): Promise<boolean> {
    await this.collection.insertOne({ remoteIdp: remoteIdp })
    return await Promise.resolve(true)
  }
}
