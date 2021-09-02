import { IGenerateMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataResponse'

export interface IGenerateMetadataFacade {
  generateMetadata: () => Promise<IGenerateMetadataResponse>
}
