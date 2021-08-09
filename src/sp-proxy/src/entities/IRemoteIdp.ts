import { UuidType } from '@sp-proxy/entities/types/UuidType'
import { SingleSignOnService } from '@sp-proxy/entities/value-objects/SingleSignOnServices'

type RemoteIdpName = string
type SigningCertificates = string[]

export interface IRemoteIdp {
  id: UuidType
  name?: RemoteIdpName
  supportedSingleSignOnServices: SingleSignOnService[]
  signingCertificates: SigningCertificates
}

export type IRemoteIdpProps = Omit<IRemoteIdp, 'id'>
