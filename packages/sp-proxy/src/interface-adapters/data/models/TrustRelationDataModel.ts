import { SingleSignOnServicesDataModel } from './SingleSignOnServicesDataModel'

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

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TrustRelationDataModel {
  export type Params = Omit<TrustRelationDataModel, 'id'>
}
