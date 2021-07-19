import { IMetadataLoaderRepository } from '../utils/IMetadataLoaderRepository'
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

  public load (): string {
    return this.loader.load(this.urlOrPath)
  }
}

