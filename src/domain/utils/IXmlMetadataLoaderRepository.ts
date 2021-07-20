import { XmlMetadata } from '../value-objects/XmlMetadata'

export interface IXmlMetadataLoaderRepository {
  load: (urlOrPath: string) => XmlMetadata
}
