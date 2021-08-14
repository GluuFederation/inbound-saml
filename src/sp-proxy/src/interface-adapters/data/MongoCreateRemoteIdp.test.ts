import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { makeRemoteIdpStub } from '@sp-proxy/interface-adapters/data/mocks/makeRemoteIdpStub.mock'
import { MongoCreateRemoteIdp } from '@sp-proxy/interface-adapters/data/MongoCreateRemoteIdp'
import { Collection, Document, MongoClient } from 'mongodb'
import * as cfg from '../data/config/env'
const config = cfg.default

describe('MongoCreateRemoteIdp - Integration', () => {
  const client = new MongoClient(config.database.mongo.uri)
  let connection: MongoClient
  let collection: Collection<Document>
  beforeAll(async () => {
    connection = await client.connect()
    collection = client
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.remoteIdps)
  })

  it('should persist Object', async () => {
    const remoteIdp = makeRemoteIdpStub()
    const sut = new MongoCreateRemoteIdp(collection)
    const actualResponse = await sut.create(remoteIdp)
    expect(actualResponse).toBeTruthy()
    const actualDb = await collection.findOne({ 'remoteIdp._id': remoteIdp.id })
    expect(actualDb).not.toBeUndefined()

    expect(actualDb).toEqual({
      _id: expect.anything(),
      remoteIdp: {
        _id: remoteIdp.id,
        props: remoteIdp.props
      }
    })
    await connection.close()
  })

  it('should throw error if no connection', async () => {
    const remoteIdp = makeRemoteIdpStub()
    const sut = new MongoCreateRemoteIdp(collection)
    await expect(sut.create(remoteIdp)).rejects.toThrow(PersistenceError)
  })
})
