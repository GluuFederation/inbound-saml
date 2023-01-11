import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'

describe('TrustRelation', () => {
  describe('get id', () => {
    it('should return TR id', () => {
      const remoteIdp = new RemoteIdp({
        name: 'valid name',
        host: 'valid host',
        signingCertificates: ['valid cert'],
        supportedSingleSignOnServices: [
          makeSingleSignOnService({ binding: 'bindinbg', location: 'location' })
        ]
      })
      const sut = new TrustRelation(
        {
          remoteIdp,
          singleSignOnService: makeSingleSignOnService({
            binding: 'bindinbg',
            location: 'location'
          })
        },
        'valid tr id'
      )
      expect(sut.id).toBe('valid tr id')
    })
  })
})
