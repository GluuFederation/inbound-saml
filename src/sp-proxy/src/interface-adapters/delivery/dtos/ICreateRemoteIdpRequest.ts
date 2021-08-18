import { IService } from '@sp-proxy/interface-adapters/protocols/IService'

export interface ICreateRemoteIdpRequest {
  name: string
  metadataEndpoint?: string
  singleSignOnService: IService[]
  signingCertificates: string[]
}
