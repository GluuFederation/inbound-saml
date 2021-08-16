import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeRemoteIdpDataStub } from '@sp-proxy/interface-adapters/data/mocks/remoteIdpDataStub'
import { MongoGetRemoteIdp } from '@sp-proxy/interface-adapters/data/MongoGetRemoteIdp'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import * as mongodb from 'mongodb'

interface SutTypes {
  sut: MongoGetRemoteIdp
  collectionStub: mongodb.Collection
  dataMapperStub: IDataMapper<any, RemoteIdp>
}

const client = new mongodb.MongoClient('mongodb://anyurl')

const makeDataMapper = (): IDataMapper<any, RemoteIdp> => {
  class DataMapperStub implements IDataMapper<any, RemoteIdp> {
    async map(dbData: any): Promise<RemoteIdp> {
      return makeRemoteIdpDataStub()
    }
  }
  return new DataMapperStub()
}

const makeSut = (): SutTypes => {
  const collectionStub = client.db().collection('any-collection')
  const dataMapperStub = makeDataMapper()
  const sut = new MongoGetRemoteIdp(collectionStub, dataMapperStub)
  return {
    sut,
    collectionStub,
    dataMapperStub
  }
}

describe('MongoGetRemoteIdp', () => {
  describe('get', () => {
    it('should call findOne with remoteIdp id', async () => {
      const { sut, collectionStub } = makeSut()
      const expectedRemoteIdp = makeRemoteIdpDataStub()
      const findOneSpy = jest
        .spyOn(collectionStub as any, 'findOne')
        .mockResolvedValueOnce({
          remoteIdp: {
            _id: 'valid id',
            props: expectedRemoteIdp.props
          }
        })
      await sut.get('valid id')
      expect(findOneSpy).toHaveBeenCalledTimes(1)
      expect(findOneSpy).toHaveBeenCalledWith({ 'remoteIdp._id': 'valid id' })
    })
    it('should call mapper once w/ values returned from findOne', async () => {
      const { sut, dataMapperStub, collectionStub } = makeSut()
      const mapSpy = jest.spyOn(dataMapperStub, 'map')
      jest
        .spyOn(collectionStub as any, 'findOne')
        .mockResolvedValueOnce('any value returned')
      await sut.get('any valid id')
      expect(mapSpy).toHaveBeenCalledTimes(1)
      expect(mapSpy).toHaveBeenCalledWith('any value returned')
    })
    it('should return same value returned from dataMapper.map', async () => {
      const { sut, dataMapperStub, collectionStub } = makeSut()
      jest
        .spyOn(collectionStub as any, 'findOne')
        .mockResolvedValueOnce('any value returned')
      jest
        .spyOn(dataMapperStub as any, 'map')
        .mockResolvedValueOnce('this value should be returned')
      expect(await sut.get('any id')).toBe('this value should be returned')
    })
  })
})
