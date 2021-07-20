import { IMetadataLoaderRepository } from '../utils/IMetadataLoaderRepository'
import { XmlMetadata } from '../value-objects/XmlMetadata'
import { IMetadataLoadService } from './protocols/IMetadataLoadService'

export class FileMetadataLoadService implements IMetadataLoadService {
  readonly urlOrPath: string
  readonly loader: IMetadataLoaderRepository
  constructor (
    urlOrPath: string,
    loader: IMetadataLoaderRepository
  ) {
    this.urlOrPath = urlOrPath
    this.loader = loader
  }

  public load (): XmlMetadata {
    return this.loader.load(this.urlOrPath)
  }
}
