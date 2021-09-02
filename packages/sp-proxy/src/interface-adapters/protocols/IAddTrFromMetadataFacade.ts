import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IAddTrFromMetadataRequest'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/SuccessResponseUseCaseParams'

export interface IAddTrFromMetadataFacade {
  addTrFromMetadata: (
    params: IAddTrFromMetadataRequest
  ) => Promise<SuccessResponseUseCaseParams>
}
