import { IService } from '@sp-proxy/use-cases/protocols/IService'

export interface ExternalUseCaseParams {
  idpSigningCert: string[]
  singleSignOnServices: IService[]
}
