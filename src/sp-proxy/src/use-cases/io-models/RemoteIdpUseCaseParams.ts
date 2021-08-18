import { IService } from '@sp-proxy/use-cases/protocols/IService'

export interface RemoteIdpUseCaseParams {
  id: string
  name: string
  metadataEndpoint?: string
  singleSignOnService: IService[]
  signingCertificates: string[]
}

export type AddRemoteIdpUseCaseParams = Omit<RemoteIdpUseCaseParams, 'id'>
