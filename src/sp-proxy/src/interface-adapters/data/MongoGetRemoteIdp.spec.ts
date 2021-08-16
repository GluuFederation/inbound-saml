import { makeRemoteIdpDataStub } from '@sp-proxy/interface-adapters/data/mocks/remoteIdpDataStub'
import { MongoGetRemoteIdp } from '@sp-proxy/interface-adapters/data/MongoGetRemoteIdp'
import * as mongodb from 'mongodb'

interface SutTypes {
  sut: MongoGetRemoteIdp
  collectionStub: mongodb.Collection
}

const client = new mongodb.MongoClient('mongodb://anyurl')

const makeSut = (): SutTypes => {
  const collectionStub = client.db().collection('any-collection')
  const sut = new MongoGetRemoteIdp(collectionStub)
  return {
    sut,
    collectionStub
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
    it('should return RemoteIdp entity with id and props returned by findOne', async () => {
      const { sut, collectionStub } = makeSut()
      const expectedRemoteIdp = makeRemoteIdpDataStub()
      jest.spyOn(collectionStub as any, 'findOne').mockResolvedValueOnce({
        remoteIdp: {
          _id: expectedRemoteIdp.id,
          props: expectedRemoteIdp.props
        }
      })
      expect(await sut.get('any id')).toStrictEqual(expectedRemoteIdp)
    })
  })
})
