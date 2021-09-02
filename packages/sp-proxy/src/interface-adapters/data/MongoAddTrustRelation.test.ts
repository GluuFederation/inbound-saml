import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { makeTrustRelationStub } from '@sp-proxy/interface-adapters/data/mocks/makeTrustRelationStub.mock'
import { MongoAddTrustRelation } from '@sp-proxy/interface-adapters/data/MongoAddTrustRelation'
import { Collection, Document, MongoClient } from 'mongodb'
import * as cfg from '../config/env'
const config = cfg.default

describe('MongoAddTrustRelation - Integration', () => {
  const client = new MongoClient(config.database.mongo.uri)
  let connection: MongoClient
  let collection: Collection<Document>
  beforeAll(async () => {
    connection = await client.connect()
    collection = client
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.trustRelations)
  })

  it('should persist Object', async () => {
    const trustRelation = makeTrustRelationStub()
    const sut = new MongoAddTrustRelation(collection)
    const actualResponse = await sut.add(trustRelation)
    expect(actualResponse).toBeTruthy()
    const actualDb = await collection.findOne({
      'trustRelation._id': trustRelation.id
    })
    expect(actualDb).not.toBeUndefined()

    expect(actualDb).toEqual({
      _id: expect.anything(),
      trustRelation: {
        _id: trustRelation.id,
        props: trustRelation.props
      }
    })
    await connection.close()
  })

  it('should throw error if no connection', async () => {
    const trustRelation = makeTrustRelationStub()
    const sut = new MongoAddTrustRelation(collection)
    await expect(sut.add(trustRelation)).rejects.toThrow(PersistenceError)
  })
})
