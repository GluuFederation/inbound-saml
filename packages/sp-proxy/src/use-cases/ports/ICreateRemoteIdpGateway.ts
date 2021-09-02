import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'

export interface ICreateRemoteIdpGateway {
  create: (remoteIdp: RemoteIdp) => Promise<boolean>
}
