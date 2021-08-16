import { IService } from '@sp-proxy/use-cases/protocols/IService'

export interface RemoteIdpUseCaseProps {
  id: string
  name: string
  metadataEndpoint?: string
  singleSignOnService: IService[]
  signingCertificates: string[]
}

export type AddRemoteIdpUseCaseProps = Omit<RemoteIdpUseCaseProps, 'id'>
