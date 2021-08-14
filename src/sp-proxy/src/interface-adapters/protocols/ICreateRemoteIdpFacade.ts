import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { ICreateRemoteIdpResponse } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpResponse'

export interface ICreateRemoteIdpFacade {
  createRemoteIdp: (
    // only props
    request: ICreateRemoteIdpRequest
  ) => Promise<ICreateRemoteIdpResponse>
}
