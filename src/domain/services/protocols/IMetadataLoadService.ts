import { IMetadataLoaderRepository } from '../../utils/IMetadataLoaderRepository'
import { XmlMetadata } from '../../value-objects/XmlMetadata'

export interface IMetadataLoadService {
  readonly urlOrPath: string
  readonly loader: IMetadataLoaderRepository
  load: () => XmlMetadata
}
