import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { IExternalDataModel } from '@sp-proxy/use-cases/io-models/IExternalDataModel'

export const makeRemoteIdpFromExternalData = (
  externalData: IExternalDataModel,
  name: string,
  id?: string
): RemoteIdp => {
  return new RemoteIdp({
    name: name,
    signingCertificates: externalData.idpSigningCert,
    supportedSingleSignOnServices: makeSingleSignOnServices(
      externalData.singleSignOnServices
    )
  })
}
