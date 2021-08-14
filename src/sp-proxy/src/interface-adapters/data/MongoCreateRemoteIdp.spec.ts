import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { makeRemoteIdpStub } from '@sp-proxy/interface-adapters/data/mocks/makeRemoteIdpStub.mock'
import { MongoCreateRemoteIdp } from '@sp-proxy/interface-adapters/data/MongoCreateRemoteIdp'
import * as mongodb from 'mongodb'
// jest.mock('mongodb')
// jest.mock('@sp-proxy/interface-adapters/data/factories/makeMongoHelper')

interface SutTypes {
  sut: MongoCreateRemoteIdp
  collectionStub: mongodb.Collection
}

const client = new mongodb.MongoClient('mongodb://anyurl')

const makeSut = (): SutTypes => {
  const collectionStub = client.db().collection('any-collection')
  const sut = new MongoCreateRemoteIdp(collectionStub)
  return {
    sut,
    collectionStub
  }
}

describe('MongoCreateRemoteIdp', () => {
  it('should call mongo insertOne once with correct values', async () => {
    const { sut, collectionStub } = makeSut()
    const insertOneSpy = jest
      .spyOn(collectionStub, 'insertOne')
      .mockReturnValueOnce()
    const remoteIdpStub = makeRemoteIdpStub()
    await sut.create(remoteIdpStub)
    expect(insertOneSpy).toHaveBeenCalledTimes(1)
    expect(insertOneSpy).toHaveBeenCalledWith({ remoteIdp: remoteIdpStub })
  })
  it('should throw PersistenceError if insertOne throws', async () => {
    const { sut, collectionStub } = makeSut()
    jest.spyOn(collectionStub, 'insertOne').mockImplementationOnce(() => {
      throw new Error('a normal error message')
    })
    await expect(sut.create(makeRemoteIdpStub())).rejects.toThrow(
      PersistenceError
    )
  })
})
