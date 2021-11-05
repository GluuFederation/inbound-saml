import { TrustRelation } from '@sp-proxy/entities/TrustRelation'

export interface IListTRsGateway {
  findAll: () => Promise<TrustRelation[]>
}
