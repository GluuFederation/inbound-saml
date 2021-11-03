// is called by interactor
// calls mongo find()
// map mongo document to entity
// return list of entities

import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import * as mongodb from 'mongodb'
import { IDataMapper } from '../protocols/IDataMapper'
import { PersistenceError } from './errors/PersistenceError'
import { MongoListTRs } from './MongoListTRs'

const makeDataMapper = (): IDataMapper<mongodb.Document[], TrustRelation[]> => {
  class DataMapperStub
    implements IDataMapper<mongodb.Document[], TrustRelation[]>
  {
    async map(mappedFrom: mongodb.Document[]): Promise<TrustRelation[]> {
      return 'valid TRs list' as any
    }
  }
  return new DataMapperStub()
}

const client = new mongodb.MongoClient('mongodb://validurl')

interface SutTypes {
  mongoCollectionStub: mongodb.Collection
  dataMapperStub: IDataMapper<mongodb.Document[], TrustRelation[]>
  sut: MongoListTRs
}

const makeSut = (): SutTypes => {
  const mongoCollectionStub = client.db().collection('any-valid-collection')
  const dataMapperStub = makeDataMapper()
  const sut = new MongoListTRs(mongoCollectionStub, dataMapperStub)
  return {
    mongoCollectionStub,
    dataMapperStub,
    sut
  }
}
describe('MongoListTRs', () => {
  it('should call document find once with no args', async () => {
    const { sut, mongoCollectionStub } = makeSut()
    const findSpy = jest
      .spyOn(mongoCollectionStub as any, 'find')
      .mockReturnValueOnce({
        toArray: async (): Promise<mongodb.Document[]> => {
          return 'valid mongo document list' as any
        }
      })
    await sut.findAll()
    expect(findSpy).toHaveBeenCalledTimes(1)
    expect(findSpy).toHaveBeenCalledWith()
  })
  it('should throw PersistenceError if find throws', async () => {
    const { sut, mongoCollectionStub } = makeSut()
    jest.spyOn(mongoCollectionStub, 'find').mockImplementationOnce(() => {
      throw new Error('the message')
    })
    await expect(sut.findAll()).rejects.toThrow(
      new PersistenceError(
        'An error ocurred while fetching all TRs from persistence'
      )
    )
  })
  it('should call dataMapper once with received document', async () => {
    const { sut, mongoCollectionStub, dataMapperStub } = makeSut()
    const mapSpy = jest.spyOn(dataMapperStub, 'map')
    jest.spyOn(mongoCollectionStub as any, 'find').mockReturnValueOnce({
      toArray: async (): Promise<mongodb.Document[]> => {
        return 'valid mongo document list' as any
      }
    })
    await sut.findAll()
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith('valid mongo document list')
  })
  it('should return mapped list of entities', async () => {
    const { sut, mongoCollectionStub, dataMapperStub } = makeSut()
    jest.spyOn(mongoCollectionStub as any, 'find').mockReturnValueOnce({
      toArray: async (): Promise<mongodb.Document[]> => {
        return 'valid mongo document list' as any
      }
    })
    jest
      .spyOn(dataMapperStub as any, 'map')
      .mockResolvedValueOnce('valid TrustRelation list')
    expect(await sut.findAll()).toEqual('valid TrustRelation list')
  })
})
