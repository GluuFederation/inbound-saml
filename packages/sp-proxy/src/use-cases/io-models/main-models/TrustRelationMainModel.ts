import { IService } from '@sp-proxy/use-cases/protocols/IService'
import { RemoteIdpMainModel } from './RemoteIdpMainModel'

export interface TrustRelationMainModel {
  id: string
  selectedSsoService: IService
  remoteIdp: RemoteIdpMainModel
}
