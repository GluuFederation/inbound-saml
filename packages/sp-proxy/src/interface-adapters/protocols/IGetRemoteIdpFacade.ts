import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/delivery/dtos/RemoteIdpDeliveryProps'

export interface IGetRemoteIdpFacade {
  getRemoteIdp: (id: string) => Promise<RemoteIdpDeliveryProps>
}
