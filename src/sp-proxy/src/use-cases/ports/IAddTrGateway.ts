import { TrustRelation } from '@sp-proxy/entities/TrustRelation'

export interface IAddTrGateway {
  add: (trustRelation: TrustRelation) => Promise<boolean>
}
