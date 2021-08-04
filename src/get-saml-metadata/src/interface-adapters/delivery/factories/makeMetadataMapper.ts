import { MetadataMapperAdapter } from '@get-saml-metadata/interface-adapters/utils/MetadataMapperAdapter'
import { IMetadataMapper } from '@get-saml-metadata/use-cases/ports/IMetadataMapper'

export const makeMetadataMapper = (): IMetadataMapper => {
  return new MetadataMapperAdapter()
}
