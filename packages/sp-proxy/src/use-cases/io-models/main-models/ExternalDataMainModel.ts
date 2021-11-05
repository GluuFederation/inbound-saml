import { IService } from '@sp-proxy/use-cases/protocols/IService'

export interface ExternalDataMainModel {
  idpSigningCert: string[]
  singleSignOnServices: IService[]
}
