import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'

export interface IGetRemoteIdpGateway {
  get: (id: string) => Promise<RemoteIdp>
}
