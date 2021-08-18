// create new TrustRelation with RemoteIdp and picks default Sso

import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { pickDefaultSso } from '@sp-proxy/use-cases/helpers/pickDefaultSso'
import { IFactory } from '@sp-proxy/use-cases/protocols/IFactory'

export interface TrustRelationWithDefaultsParams {
  remoteIdp: RemoteIdp
  trId?: string
}

/**
 * Factory class to create Trust Relation isntance from remoteIdp
 * and choose default SingleSignOnService according to application rules
 * @export
 * @class TrustRelationWithDefaultFactory
 * @implements {IFactory<TrustRelationWithDefaultsParams, TrustRelation>}
 */
export class TrustRelationWithDefaultFactory
  implements IFactory<TrustRelationWithDefaultsParams, TrustRelation>
{
  /**
   * Create TrustRelation instance and assign default SingleSignOnService
   *
   * @param {TrustRelationWithDefaultsParams} params
   * @param {string} [trId]
   * @return {*}  {Promise<TrustRelation>}
   * @memberof TrustRelationWithDefaultFactory
   */
  async make(
    params: TrustRelationWithDefaultsParams,
    trId?: string
  ): Promise<TrustRelation> {
    return new TrustRelation(
      {
        remoteIdp: params.remoteIdp,
        singleSignOnService: pickDefaultSso(
          params.remoteIdp.props.supportedSingleSignOnServices
        )
      },
      trId
    )
  }
}
