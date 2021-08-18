import { IExternalDataModel } from '@sp-proxy/use-cases/io-models/IExternalDataModel'

export interface IFetchExternalDataGateway {
  fetch: (url: string) => Promise<IExternalDataModel>
}
