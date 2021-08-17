import { IService } from '@sp-proxy/use-cases/protocols/IService'

export interface IExternalDataModel {
  idpSigningCert: string[]
  singleSignOnServices: IService[]
}
