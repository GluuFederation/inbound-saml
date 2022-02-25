import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { GetTrByHostResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostResponseUseCaseParams'
import { GetTrByHostUseCaseMapper } from '@sp-proxy/use-cases/mappers/GetTrByHostUseCaseMapper'
import { makeRemoteIdpUseCaseStub } from '@sp-proxy/use-cases/mocks/remoteIdpUseCaseStub'
import { IService } from '@sp-proxy/use-cases/protocols/IService'

const fakeTrustRelationProps: ITrustRelationProps = {
  remoteIdp: makeRemoteIdpUseCaseStub(),
  singleSignOnService: makeSingleSignOnService(
    makeRemoteIdpUseCaseStub().props.supportedSingleSignOnServices[0].props
  )
}

// helper
const getSsoServices = (remoteIdp: RemoteIdp): IService[] => {
  const ssoServices: IService[] = []
  for (const ssoService of remoteIdp.props.supportedSingleSignOnServices) {
    ssoServices.push(ssoService.props)
  }
  return ssoServices
}

describe('GetTrByHostUseCaseMapper', () => {
  it('should map Trust Relation to response model params', () => {
    const sut = new GetTrByHostUseCaseMapper()
    const fakeTrustRelation = new TrustRelation(fakeTrustRelationProps)
    const expectedResponseModel: GetTrByHostResponseUseCaseParams = {
      id: fakeTrustRelation.id,
      selectedSsoService:
        fakeTrustRelation.props.remoteIdp.props.supportedSingleSignOnServices[0]
          .props,
      remoteIdp: {
        id: fakeTrustRelation.props.remoteIdp.id,
        name: fakeTrustRelation.props.remoteIdp.props.name,
        host: fakeTrustRelation.props.remoteIdp.props.host,
        singleSignOnService: getSsoServices(fakeTrustRelation.props.remoteIdp),
        signingCertificates:
          fakeTrustRelation.props.remoteIdp.props.signingCertificates
      }
    }
    expect(sut.map(fakeTrustRelation)).toStrictEqual(expectedResponseModel)
  })
})
