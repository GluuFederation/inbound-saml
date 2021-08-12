import { CreateRemoteIdpControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/CreateRemoteIdpControllerMapper'
import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

const fakeRequest: IRequest<ICreateRemoteIdpRequest> = {
  id: 'valid request id',
  body: {
    name: 'valid name',
    singleSignOnService: [
      {
        binding: 'valid binding 1',
        location: 'valid location 1'
      },
      {
        binding: 'valid binding 2',
        location: 'valid location 2'
      }
    ],
    signingCertificates: ['valid cert 1', 'valid cert 2']
  }
}

describe('CreateRemoteIdpControllerMapper', () => {
  describe('map', () => {
    it('should map request correctly', () => {})
    const sut = new CreateRemoteIdpControllerMapper()
    const expected: IRequestModel<CreateRemoteIdpRequestModel> = {
      requestId: fakeRequest.id,
      request: {
        name: fakeRequest.body.name,
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
