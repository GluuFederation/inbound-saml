import { IService } from '@sp-proxy/use-cases/protocols/IService'

export interface CreateRemoteIdpRequestModel {
  name: string
  metadataEndpoint?: string
  singleSignOnService: IService[]
  signingCertificates: string[]
}

// export interface CreateRemoteIdpRequestModel extends IRequestModel {
//   remoteIdp: RemoteIdpRequestModelProps
// }
