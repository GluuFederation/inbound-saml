import { IExternalData } from '@get-saml-metadata/entities/IExternalData'
import { IMetadata } from '@get-saml-metadata/entities/IMetadataTypes'

export interface IExternalDataMapper {
  map: (metadata: IMetadata) => IExternalData
}
