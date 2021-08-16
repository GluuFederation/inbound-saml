import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { IGetRemoteIdpGateway } from '@sp-proxy/use-cases/ports/IGetRemoteIdpGateway'
import { Collection } from 'mongodb'

export class MongoGetRemoteIdp implements IGetRemoteIdpGateway {
  // TODO: inject mapper to map form mongo bson to entity
  constructor(private readonly collection: Collection) {}
  async get(remoteIdpId: string): Promise<RemoteIdp> {
    const document = await this.collection.findOne({
      'remoteIdp._id': remoteIdpId
    })
    if (document != null) {
      return new RemoteIdp(document.remoteIdp.props, document.remoteIdp._id)
    } else {
      throw new PersistenceError(
        `No document returned from MongoDB when trying to get by id ${remoteIdpId}`
      )
    }
  }
}
