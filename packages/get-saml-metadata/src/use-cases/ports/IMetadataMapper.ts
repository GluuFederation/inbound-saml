import { IMetadata } from '@get-saml-metadata/entities/IMetadataTypes'

export interface IMetadataMapper {
  map: (xmlData: string) => IMetadata
}
