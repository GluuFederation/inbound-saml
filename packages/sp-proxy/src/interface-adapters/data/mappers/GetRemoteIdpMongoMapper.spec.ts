import { GetRemoteIdpMongoMapper } from '@sp-proxy/interface-adapters/data/mappers/GetRemoteIdpMongoMapper'
import { makeRemoteIdpDataStub } from '@sp-proxy/interface-adapters/data/mocks/remoteIdpDataStub'

describe('GetRemoteIdpMongoMapper', () => {
  it('should return mapped RemoteIdp', async () => {
    const sut = new GetRemoteIdpMongoMapper()
    const expectedEntity = makeRemoteIdpDataStub()
    const dbData = {
      remoteIdp: {
        _id: expectedEntity.id,
        props: expectedEntity.props
      }
    }
    expect(await sut.map(dbData)).toStrictEqual(expectedEntity)
  })
})
