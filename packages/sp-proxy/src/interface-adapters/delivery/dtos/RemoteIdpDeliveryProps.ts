/**
 * Shoud be independent from other layers
 */
export interface IDeliveryService {
  binding: string
  location: string
}

export interface RemoteIdpDeliveryProps {
  id: string
  name: string
  host: string
  metadataEndpoint?: string
  singleSignOnService: IDeliveryService[]
  signingCertificates: string[]
}
