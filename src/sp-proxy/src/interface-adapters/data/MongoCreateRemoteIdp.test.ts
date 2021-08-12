import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { makeMongoHelper } from '@sp-proxy/interface-adapters/data/factories/makeMongoHelper'
import { MongoHelper } from '@sp-proxy/interface-adapters/data/helpers/MongoHelper'
import { makeRemoteIdpStub } from '@sp-proxy/interface-adapters/data/mocks/makeRemoteIdpStub.mock'
import { MongoCreateRemoteIdp } from '@sp-proxy/interface-adapters/data/MongoCreateRemoteIdp'
import { Collection } from 'mongodb'
import * as cfg from '../data/config/env'
const config = cfg.default

interface SutTypes {
  sut: MongoCreateRemoteIdp
  helper: MongoHelper
  collection: Collection
}

const globalHelper = makeMongoHelper()

const makeSut = async (): Promise<SutTypes> => {
  const helper = globalHelper
  const collection = await helper.getCollection(
    config.database.mongo.collections.remoteIdps
  )
  const sut = new MongoCreateRemoteIdp(collection)
  return {
    sut: sut,
    helper: helper,
    collection: collection
  }
}

describe('MongoCreateRemoteIdp - Integration', () => {
  beforeAll(async () => {
    await globalHelper.connect()
    await globalHelper.prepare()
  })

  afterAll(async () => {
    await globalHelper.client.close()
  })

  it('should persist Object', async () => {
    const { sut, collection, helper } = await makeSut()
    await helper.prepare()
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
    const { sut } = await makeSut()
    await globalHelper.client.close()
    const remoteIdp = makeRemoteIdpStub()
    await expect(sut.create(remoteIdp)).rejects.toThrow(PersistenceError)
  })
})
