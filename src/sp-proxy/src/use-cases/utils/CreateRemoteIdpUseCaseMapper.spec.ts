import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { CreateRemoteIdpUseCaseMapper } from '@sp-proxy/use-cases/utils/CreateRemoteIdpUseCaseMapper'

const fakeRequestModel: IRequestModel<CreateRemoteIdpRequestModel> = {
  requestId: 'valid request ID',
  request: {
    name: 'valid name',
    metadataEndpoint: 'valid endpoint',
    singleSignOnService: [
      {
        binding: 'valid binding',
        location: 'valid location'
      }
    ],
    signingCertificates: ['valid cert 1', 'valid cert 2']
  }
}

describe('CreateRemoteIdpUseCaseMapper', () => {
  it('should map RequestModel to Entity', () => {
    const sut = new CreateRemoteIdpUseCaseMapper()
    const actual = sut.map(fakeRequestModel)
    expect(actual.props.name).toEqual(fakeRequestModel.request.name)
    expect(actual.props.signingCertificates).toEqual(
      fakeRequestModel.request.signingCertificates
    )
    expect(actual.props.supportedSingleSignOnServices[0].props).toStrictEqual(
      fakeRequestModel.request.singleSignOnService[0]
    )
  })
})
