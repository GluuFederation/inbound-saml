import { getFromUrl } from '@get-saml-metadata/lib'
import { ExternalDataMainModel } from '@sp-proxy/use-cases/io-models/main-models/ExternalDataMainModel'
import { IFetchExternalDataGateway } from '@sp-proxy/use-cases/ports/IFetchExternalDataGateway'

// TODO: inject getFromUrl object
export class GetSamlFetchExternalData implements IFetchExternalDataGateway {
  async fetch(url: string): Promise<ExternalDataMainModel> {
    return await getFromUrl(url)
  }
}
