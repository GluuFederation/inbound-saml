import { ExternalUseCaseParams } from '@sp-proxy/use-cases/io-models/ExternalUseCaseParams'

export interface IFetchExternalDataGateway {
  fetch: (url: string) => Promise<ExternalUseCaseParams>
}
