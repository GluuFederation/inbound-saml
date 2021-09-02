import {
  IDeliveryService,
  RemoteIdpDeliveryProps
} from '@sp-proxy/interface-adapters/delivery/dtos/RemoteIdpDeliveryProps'

export interface IGetTrByHostResponse {
  id: string
  selectedSsoService: IDeliveryService
  remoteIdp: RemoteIdpDeliveryProps
}
