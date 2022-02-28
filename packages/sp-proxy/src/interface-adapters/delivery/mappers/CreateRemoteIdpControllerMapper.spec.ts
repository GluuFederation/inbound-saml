import { CreateRemoteIdpControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/CreateRemoteIdpControllerMapper'
import { fakeCreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/mocks/fakeCreateRemoteIdpRequest.mock'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { AddRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'

const fakeRequest = fakeCreateRemoteIdpRequest

describe('CreateRemoteIdpControllerMapper', () => {
  describe('map', () => {
    it('should map request correctly', () => {})
    const sut = new CreateRemoteIdpControllerMapper()
    const expected: IRequestModel<AddRemoteIdpUseCaseParams> = {
      requestId: fakeRequest.id,
      request: {
        name: fakeRequest.body.name,
        host: fakeRequest.body.host,
        singleSignOnService: [
          {
            binding: fakeRequest.body.singleSignOnService[0].binding,
            location: fakeRequest.body.singleSignOnService[0].location
          },
          {
            binding: fakeRequest.body.singleSignOnService[1].binding,
            location: fakeRequest.body.singleSignOnService[1].location
          }
        ],
        signingCertificates: [
          fakeRequest.body.signingCertificates[0],
          fakeRequest.body.signingCertificates[1]
        ]
      }
    }
    expect(sut.map(fakeRequest)).toStrictEqual(expected)
  })
})
