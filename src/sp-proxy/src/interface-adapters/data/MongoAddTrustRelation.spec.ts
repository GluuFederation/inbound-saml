import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { makeTrustRelationStub } from '@sp-proxy/interface-adapters/data/mocks/makeTrustRelationStub.mock'
import { MongoAddTrustRelation } from '@sp-proxy/interface-adapters/data/MongoAddTrustRelation'
import * as mongodb from 'mongodb'

interface SutTypes {
  sut: MongoAddTrustRelation
  collectionStub: mongodb.Collection
}

const client = new mongodb.MongoClient('mongodb://anyurl')

const makeSut = (): SutTypes => {
  const collectionStub = client.db().collection('any-collection')
  const sut = new MongoAddTrustRelation(collectionStub)
  return {
    sut,
    collectionStub
  }
}

describe('MongoAddTrustRelation', () => {
  it('should call mongo insertOne once with correct values', async () => {
    const { sut, collectionStub } = makeSut()
    const insertOneSpy = jest
      .spyOn(collectionStub, 'insertOne')
      .mockReturnValueOnce()
    const trustRelationStub = makeTrustRelationStub()
    await sut.add(trustRelationStub)
    expect(insertOneSpy).toHaveBeenCalledTimes(1)
    expect(insertOneSpy).toHaveBeenCalledWith({
      trustRelation: trustRelationStub
    })
  })
  it('should throw PersistenceError if insertOne throws', async () => {
    const { sut, collectionStub } = makeSut()
    jest.spyOn(collectionStub, 'insertOne').mockImplementationOnce(() => {
      throw new Error('a normal error message')
    })
    await expect(sut.add(makeTrustRelationStub())).rejects.toThrow(
      PersistenceError
    )
  })
})
