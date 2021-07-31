import { IXmlMetadataLoadService } from './IXmlMetadataLoadService'
import { XmlMetadata } from '../entities/value-objects/XmlMetadata'
import { IXmlMetadataLoaderRepository } from './ports/IXmlMetadataLoaderRepository'

export class XmlMetadataLoadService implements IXmlMetadataLoadService {
  private readonly urlOrPath: string
  private readonly loader: IXmlMetadataLoaderRepository
  constructor (
    urlOrPath: string,
    loader: IXmlMetadataLoaderRepository
  ) {
    this.urlOrPath = urlOrPath
    this.loader = loader
  }

  public load (): XmlMetadata {
    return this.loader.load(this.urlOrPath)
  }
}
