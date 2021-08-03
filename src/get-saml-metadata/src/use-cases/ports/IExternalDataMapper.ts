import { IExternalData } from '../../entities/IExternalData'
import { IMetadata } from '../../entities/IMetadataTypes'

export interface IExternalDataMapper {
  map: (metadata: IMetadata) => IExternalData
}
