/**
 * Shoud be independent from other layers
 */
interface IDeliveryService {
  binding: string
  location: string
}

export interface RemoteIdpDeliveryProps {
  id: string
  name: string
  metadataEndpoint?: string
  singleSignOnService: IDeliveryService[]
  signingCertificates: string[]
}
