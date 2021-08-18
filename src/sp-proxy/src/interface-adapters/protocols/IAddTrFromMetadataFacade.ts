import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'

export interface IAddTrFromMetadataFacade {
  addTrFromMetadata: (params: IAddTrFromMetadataRequest) => Promise<boolean>
}
