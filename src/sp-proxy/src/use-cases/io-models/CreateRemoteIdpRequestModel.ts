import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IService } from '@sp-proxy/use-cases/protocols/IService'

interface IRemoteIdp {
  name: string
  metadataEndpoint?: string
  singleSignOnService: IService[]
  signingCertificates: string[]
}

export interface CreateRemoteIdpRequestModel extends IRequestModel {
  remoteIdp: IRemoteIdp
}
