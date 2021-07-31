import { IMetadata } from './IMetadataTypes'

export interface IMetadataMapper {
  map: (xmlData: string) => IMetadata
}
