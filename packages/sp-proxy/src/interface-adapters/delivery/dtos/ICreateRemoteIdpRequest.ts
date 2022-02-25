import { IService } from '@sp-proxy/interface-adapters/protocols/IService'

export interface ICreateRemoteIdpRequest {
  name: string
  host: string
  metadataEndpoint?: string
  singleSignOnService: IService[]
  signingCertificates: string[]
}
