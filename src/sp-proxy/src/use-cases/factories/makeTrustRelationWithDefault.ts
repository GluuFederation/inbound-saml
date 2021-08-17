// create new TrustRelation with RemoteIdp and picks default Sso

import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { pickDefaultSso } from '@sp-proxy/use-cases/helpers/pickDefaultSso'

/**
 * Create TrustRelation entity and set default SingleSignOnService
 * @param {RemoteIdp} remoteIdp
 * @param trId
 * @returns
 */
export const makeTrustRelationWithDefault = (
  remoteIdp: RemoteIdp,
  trId?: string
): TrustRelation => {
  return new TrustRelation({
    remoteIdp: remoteIdp,
    singleSignOnService: pickDefaultSso(
      remoteIdp.props.supportedSingleSignOnServices
    )
  })
}
