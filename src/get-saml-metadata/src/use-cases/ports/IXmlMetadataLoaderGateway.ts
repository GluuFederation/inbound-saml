import { XmlMetadata } from '../../entities/value-objects/XmlMetadata'

export interface IXmlMetadataLoaderGateway {
  load: (urlOrPath: string) => XmlMetadata
}
