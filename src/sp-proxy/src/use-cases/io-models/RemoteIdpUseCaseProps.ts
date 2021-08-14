import { IService } from '@sp-proxy/use-cases/protocols/IService'

export interface RemoteIdpUseCaseProps {
  name: string
  metadataEndpoint?: string
  singleSignOnService: IService[]
  signingCertificates: string[]
}
