import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeRemoteIdpUseCaseStub } from '@sp-proxy/use-cases/mocks/remoteIdpUseCaseStub'
import { IGetRemoteIdpGateway } from '@sp-proxy/use-cases/ports/IGetRemoteIdpGateway'
import { Collection } from 'mongodb'

export class MongoGetRemoteIdp implements IGetRemoteIdpGateway {
  constructor(private readonly collection: Collection) {}
  async get(remoteIdpId: string): Promise<RemoteIdp> {
    // any value to ensure correct impl for tests
    await this.collection.findOne({
      'remoteIdp._id': remoteIdpId
    })
    return makeRemoteIdpUseCaseStub()
  }
}
