import { IExternalData } from './IExternalData'
import { IMetadata } from './IMetadataTypes'

export interface IExternalDataMapper {
  map: (metadata: IMetadata) => IExternalData
}
