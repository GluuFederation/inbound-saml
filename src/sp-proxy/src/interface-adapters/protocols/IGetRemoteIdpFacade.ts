import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/protocols/RemoteIdpDeliveryProps'

export interface IGetRemoteIdpFacade {
  getRemoteIdp: (id: string) => Promise<RemoteIdpDeliveryProps>
}
