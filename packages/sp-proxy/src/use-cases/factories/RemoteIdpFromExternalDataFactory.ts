import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { ExternalDataMainModel } from '@sp-proxy/use-cases/io-models/main-models/ExternalDataMainModel'
import { IFactory } from '@sp-proxy/use-cases/protocols/IFactory'

export interface RemoteIdpFromExternalParams {
  externalData: ExternalDataMainModel
  name: string
  id?: string
}

export class RemoteIdpFromExternalDataFactory
  implements IFactory<RemoteIdpFromExternalParams, RemoteIdp>
{
  async make(params: RemoteIdpFromExternalParams): Promise<RemoteIdp> {
    return new RemoteIdp({
      name: params.name,
      signingCertificates: params.externalData.idpSigningCert,
      supportedSingleSignOnServices: makeSingleSignOnServices(
        params.externalData.singleSignOnServices
      )
    })
  }
}
