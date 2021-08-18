import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'
import { SuccessResponseModel } from '@sp-proxy/use-cases/io-models/SuccessResponseModel'

export interface IAddTrFromMetadataFacade {
  addTrFromMetadata: (
    params: IAddTrFromMetadataRequest
  ) => Promise<SuccessResponseModel>
}
