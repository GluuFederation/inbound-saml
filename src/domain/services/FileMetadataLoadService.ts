import { IMetadataLoader } from '../value-objects/protocols/IMetadataLoader'
import { IMetadataLoadService } from './protocols/IMetadataLoadService'

export class FileMetadataLoadService implements IMetadataLoadService {
  readonly urlOrPath: string
  readonly loader: IMetadataLoader
  constructor (
    urlOrPath: string,
    loader: IMetadataLoader
  ) {
    this.urlOrPath = urlOrPath
    this.loader = loader
  }

  public load (): string {
    return this.loader.load(this.urlOrPath)
  }
}
