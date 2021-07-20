import { IXmlMetadataLoaderRepository } from '../utils/IXmlMetadataLoaderRepository'
import { XmlMetadata } from '../value-objects/XmlMetadata'
import { IXmlMetadataLoadService } from './protocols/IXmlMetadataLoadService'

export class XmlMetadataLoadService implements IXmlMetadataLoadService {
  readonly urlOrPath: string
  readonly loader: IXmlMetadataLoaderRepository
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
