import { XmlMetadata } from '../value-objects/XmlMetadata'

export interface IMetadataLoaderRepository {
  load: (urlOrPath: string) => XmlMetadata
}
