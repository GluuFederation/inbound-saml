import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { makeRemoteIdpStub } from '@sp-proxy/interface-adapters/data/mocks/makeRemoteIdpStub.mock'

export const fakeTrustRelationProps: ITrustRelationProps = {
  remoteIdp: makeRemoteIdpStub(),
  singleSignOnService: makeSingleSignOnService(
    makeRemoteIdpStub().props.supportedSingleSignOnServices[0].props
  )
}

/**
 * create TR Stub for DATA layer using fakeTrustRelationProps
 * @returns {TrustRelation} instance
 */
export const makeTrustRelationStub = (): TrustRelation => {
  return new TrustRelation(fakeTrustRelationProps)
}
