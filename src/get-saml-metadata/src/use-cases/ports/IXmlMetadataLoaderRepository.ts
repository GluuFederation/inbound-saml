import { XmlMetadata } from '../../entities/value-objects/XmlMetadata'

export interface IXmlMetadataLoaderRepository {
  load: (urlOrPath: string) => XmlMetadata
}
