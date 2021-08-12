import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { makeMongoHelper } from '@sp-proxy/interface-adapters/data/factories/makeMongoHelper'
import { makeRemoteIdpStub } from '@sp-proxy/interface-adapters/data/mocks/makeRemoteIdpStub.mock'
import { MongoCreateRemoteIdp } from '@sp-proxy/interface-adapters/data/MongoCreateRemoteIdp'
import * as cfg from '../data/config/env'
const config = cfg.default

describe('MongoCreateRemoteIdp - Integration', () => {
  it('should persist Object', async () => {
    const helper = makeMongoHelper()
    await helper.prepare()
    const collection = await helper.getCollection(
      config.database.mongo.collections.remoteIdps
    )
    const sut = new MongoCreateRemoteIdp(collection)
    const remoteIdp = makeRemoteIdpStub()
    await helper.connect()
    await sut.create(remoteIdp)
    const actual = await collection.findOne({ 'remoteIdp._id': remoteIdp.id })
    expect(actual).not.toBeUndefined()
    expect(actual).toEqual({
      _id: expect.anything(),
      remoteIdp: {
        _id: remoteIdp.id,
        props: remoteIdp.props
      }
    })
  })
  it('should throw error if no connection', async () => {
    const helper = makeMongoHelper()
    await helper.prepare()
    const collection = helper.client
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.remoteIdps)
    const sut = new MongoCreateRemoteIdp(collection)
    const remoteIdp = makeRemoteIdpStub()
    // no connection
    await expect(sut.create(remoteIdp)).rejects.toThrow(PersistenceError)
  })
})
