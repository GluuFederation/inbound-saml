import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import { IGetRemoteIdpGateway } from '@sp-proxy/use-cases/ports/IGetRemoteIdpGateway'
import { Collection } from 'mongodb'

export class MongoGetRemoteIdp implements IGetRemoteIdpGateway {
  constructor(
    private readonly collection: Collection,
    private readonly dataMapper: IDataMapper<any, RemoteIdp>
  ) {}

  async get(remoteIdpId: string): Promise<RemoteIdp> {
    try {
      const document = await this.collection.findOne({
        'remoteIdp._id': remoteIdpId
      })
      if (document == null) {
        throw new PersistenceError(`No remote idp with id ${remoteIdpId} found`)
      }
      const remoteIdpEntity = await this.dataMapper.map(document)
      return remoteIdpEntity
    } catch (err) {
      throw new PersistenceError(
        `Error getting RemoteIdp with id ${remoteIdpId} in MongoDB: ${
          (err as Error).name
        }: ${(err as Error).message}`
      )
    }
  }
}
