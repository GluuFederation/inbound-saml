import { XmlMetadata } from '@get-saml-metadata/entities/value-objects/XmlMetadata'

export interface IXmlMetadataLoaderGateway {
  load: (urlOrPath: string) => XmlMetadata
}
