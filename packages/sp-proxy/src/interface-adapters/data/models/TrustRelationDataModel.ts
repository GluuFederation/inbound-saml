import { SingleSignOnServicesDataModel } from './SingleSignOnServicesDataModel';

export interface TrustRelationDataModel {
  remoteIdp: {
    name: string
    host: string
    supportedSingleSignOnServices: SingleSignOnServicesDataModel[]
    signingCertificates: string[]
    id: string
  }
  selectedSingleSignOnService: SingleSignOnServicesDataModel
}
