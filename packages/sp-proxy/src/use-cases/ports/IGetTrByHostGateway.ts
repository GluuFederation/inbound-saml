import { TrustRelation } from '@sp-proxy/entities/TrustRelation'

export interface IGetTrByHostGateway {
  findByHost: (host: string) => Promise<TrustRelation>
}
