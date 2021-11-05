import { ExternalDataMainModel } from '@sp-proxy/use-cases/io-models/main-models/ExternalDataMainModel'

export interface IFetchExternalDataGateway {
  fetch: (url: string) => Promise<ExternalDataMainModel>
}
