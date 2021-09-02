import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { ExternalUseCaseParams } from '@sp-proxy/use-cases/io-models/ExternalUseCaseParams'
import { IFactory } from '@sp-proxy/use-cases/protocols/IFactory'

export interface RemoteIdpFromExternalParams {
  externalData: ExternalUseCaseParams
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
