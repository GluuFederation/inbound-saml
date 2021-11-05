import { IService } from '@sp-proxy/use-cases/protocols/IService'

export interface RemoteIdpMainModel {
  id: string
  name: string
  metadataEndpoint?: string
  singleSignOnService: IService[]
  signingCertificates: string[]
}
