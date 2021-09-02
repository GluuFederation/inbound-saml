import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { SingleSignOnService } from '@sp-proxy/entities/value-objects/SingleSignOnServices'

export interface ITrustRelationProps {
  remoteIdp: RemoteIdp
  singleSignOnService: SingleSignOnService
}
