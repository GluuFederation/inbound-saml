import { ISingleSignOnService } from './ISingleSignOnService'

export interface IExternalData {
  idpSigningCert: string[]
  singleSignOnServices: ISingleSignOnService[]
}
