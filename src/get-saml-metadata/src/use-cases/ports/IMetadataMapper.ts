import { IMetadata } from '../../entities/IMetadataTypes'

export interface IMetadataMapper {
  map: (xmlData: string) => IMetadata
}
