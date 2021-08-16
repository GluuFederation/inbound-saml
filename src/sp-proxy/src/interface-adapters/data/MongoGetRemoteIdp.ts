import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import { IGetRemoteIdpGateway } from '@sp-proxy/use-cases/ports/IGetRemoteIdpGateway'
import { Collection } from 'mongodb'

export class MongoGetRemoteIdp implements IGetRemoteIdpGateway {
  constructor(
    private readonly collection: Collection,
    private readonly dataMapper: IDataMapper<any, RemoteIdp>
  ) {}

  async get(remoteIdpId: string): Promise<RemoteIdp> {
    const document = await this.collection.findOne({
      'remoteIdp._id': remoteIdpId
    })
    const remoteIdpEntity = await this.dataMapper.map(document)
    return remoteIdpEntity
  }
}
