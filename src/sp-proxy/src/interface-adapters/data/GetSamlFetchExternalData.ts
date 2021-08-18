import { getFromUrl } from '@get-saml-metadata/lib'
import { IExternalDataModel } from '@sp-proxy/use-cases/io-models/IExternalDataModel'
import { IFetchExternalDataGateway } from '@sp-proxy/use-cases/ports/IFetchExternalDataGateway'

// TODO: inject getFromUrl object
export class GetSamlFetchExternalData implements IFetchExternalDataGateway {
  async fetch(url: string): Promise<IExternalDataModel> {
    return await getFromUrl(url)
  }
}
