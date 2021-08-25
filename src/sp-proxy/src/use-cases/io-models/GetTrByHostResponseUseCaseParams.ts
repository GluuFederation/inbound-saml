import { RemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'

export interface GetTrByHostResponseUseCaseParams {
  id: string
  selectedSsoService: string
  remoteIdp: RemoteIdpUseCaseParams
}
