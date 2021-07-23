import { XmlMetadata } from '../../value-objects/XmlMetadata'

export interface IXmlMetadataLoadService {
  // readonly urlOrPath: string
  // readonly loader: IXmlMetadataLoaderRepository
  load: () => XmlMetadata
}
