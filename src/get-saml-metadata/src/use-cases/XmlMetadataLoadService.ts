import { IXmlMetadataLoadService } from './IXmlMetadataLoadService'
import { XmlMetadata } from '../entities/value-objects/XmlMetadata'
import { IXmlMetadataLoaderGateway } from './ports/IXmlMetadataLoaderGateway'

export class XmlMetadataLoadService implements IXmlMetadataLoadService {
  private readonly urlOrPath: string
  private readonly loader: IXmlMetadataLoaderGateway
  constructor (
    urlOrPath: string,
    loader: IXmlMetadataLoaderGateway
  ) {
    this.urlOrPath = urlOrPath
    this.loader = loader
  }

  public load (): XmlMetadata {
    return this.loader.load(this.urlOrPath)
  }
}
