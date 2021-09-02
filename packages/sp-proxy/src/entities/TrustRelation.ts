import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { BaseEntity } from '@sp-proxy/entities/types/BaseEntity'

export class TrustRelation extends BaseEntity<ITrustRelationProps> {
  public get id(): string {
    return this._id
  }
}
