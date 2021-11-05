import { RemoteIdpMainModel } from '@sp-proxy/use-cases/io-models/main-models/RemoteIdpMainModel'
import { GetRemoteIdpUseCaseMapper } from '@sp-proxy/use-cases/mappers/GetRemoteIdpUseCaseMapper'
import { makeRemoteIdpUseCaseStub } from '@sp-proxy/use-cases/mocks/remoteIdpUseCaseStub'

describe('GetRemoteIdpUseCaseMapper', () => {
  it('should map RemoteIdp entity to usecase props', () => {
    const fakeRemoteIdp = makeRemoteIdpUseCaseStub()
    const expectedResponseModel: RemoteIdpMainModel = {
      id: fakeRemoteIdp.id,
      singleSignOnService: [
        {
          binding:
            fakeRemoteIdp.props.supportedSingleSignOnServices[0].props.binding,
          location:
            fakeRemoteIdp.props.supportedSingleSignOnServices[0].props.location
        }
      ],
      signingCertificates: fakeRemoteIdp.props.signingCertificates,
      name: fakeRemoteIdp.props.name
    }
    const sut = new GetRemoteIdpUseCaseMapper()
    expect(sut.map(fakeRemoteIdp)).toStrictEqual(expectedResponseModel)
  })
})
