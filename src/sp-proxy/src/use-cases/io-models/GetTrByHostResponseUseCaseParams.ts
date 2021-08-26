import { RemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'
import { IService } from '@sp-proxy/use-cases/protocols/IService'

export interface GetTrByHostResponseUseCaseParams {
  id: string
  selectedSsoService: IService
  remoteIdp: RemoteIdpUseCaseParams
}
