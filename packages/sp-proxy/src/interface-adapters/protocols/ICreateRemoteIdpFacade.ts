import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/dtos/ICreateRemoteIdpRequest'
import { ICreateRemoteIdpResponse } from '@sp-proxy/interface-adapters/delivery/dtos/ICreateRemoteIdpResponse'

export interface ICreateRemoteIdpFacade {
  createRemoteIdp: (
    // only props
    request: ICreateRemoteIdpRequest
  ) => Promise<ICreateRemoteIdpResponse>
}
