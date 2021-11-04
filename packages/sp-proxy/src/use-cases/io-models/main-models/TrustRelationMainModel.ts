import { IService } from '@sp-proxy/use-cases/protocols/IService'
import { RemoteIdpUseCaseParams } from '../RemoteIdpUseCaseParams'

export interface TrustRelationMainModel {
  id: string
  selectedSsoService: IService
  remoteIdp: RemoteIdpUseCaseParams
}
