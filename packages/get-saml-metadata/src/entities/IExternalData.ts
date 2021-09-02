import { ISingleSignOnService } from '@get-saml-metadata/entities/ISingleSignOnService'

export interface IExternalData {
  idpSigningCert: string[]
  singleSignOnServices: ISingleSignOnService[]
}
