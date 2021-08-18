import { getFromUrl } from '@get-saml-metadata/lib'
import { ExternalUseCaseParams } from '@sp-proxy/use-cases/io-models/ExternalUseCaseParams'
import { IFetchExternalDataGateway } from '@sp-proxy/use-cases/ports/IFetchExternalDataGateway'

// TODO: inject getFromUrl object
export class GetSamlFetchExternalData implements IFetchExternalDataGateway {
  async fetch(url: string): Promise<ExternalUseCaseParams> {
    return await getFromUrl(url)
  }
}
