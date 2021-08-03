import { IMetadataMapper } from '../../../use-cases/ports/IMetadataMapper'
import { MetadataMapperAdapter } from '../../utils/MetadataMapperAdapter'

export const makeMetadataMapper = (): IMetadataMapper => {
  return new MetadataMapperAdapter()
}
