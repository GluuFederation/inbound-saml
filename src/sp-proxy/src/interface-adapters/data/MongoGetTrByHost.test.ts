import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { GetTrByHostMongoMapper } from '@sp-proxy/interface-adapters/data/mappers/GetTrByHostMongoMapper'
import { fakeTrustRelationProps } from '@sp-proxy/interface-adapters/data/mocks/makeTrustRelationStub.mock'
import { MongoGetTrByHost } from '@sp-proxy/interface-adapters/data/MongoGetTrByHost'
import { Collection, MongoClient, Document as MongoDocument } from 'mongodb'
import * as cfg from '../config/env'
const config = cfg.default

describe('MongoGetTrByHost - integration', () => {
  const client = new MongoClient(config.database.mongo.uri)
  let connection: MongoClient
  let collection: Collection<MongoDocument>
  beforeAll(async () => {
    connection = await client.connect()
    collection = client
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.trustRelations)
  })
  afterAll(async () => {
    await collection.drop()
    await connection.close()
  })

  it('should return valid TrustRelation entity', async () => {
    // persist data to be fetched
    const trustRelationProps = fakeTrustRelationProps
    trustRelationProps.singleSignOnService = makeSingleSignOnService({
      binding: 'any binding',
      location: 'https://valid.host/any-path'
    })
    const trustRelation = new TrustRelation(trustRelationProps, 'mytestid')

    await collection.insertOne({ trustRelation: trustRelation })

    const mapper = new GetTrByHostMongoMapper()
    const sut = new MongoGetTrByHost(collection, mapper)
    const result = await sut.findByHost('valid.host')
    expect(result.id).toEqual('mytestid')
  })
  it('should throw if unexistant host', async () => {
    const mapper = new GetTrByHostMongoMapper()
    const sut = new MongoGetTrByHost(collection, mapper)
    await expect(sut.findByHost('unexistant.host')).rejects.toThrow(
      PersistenceError
    )
  })
})
