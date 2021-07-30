import { Entity } from './types/Entity'
import { InvalidPathOrUrlError } from './errors/InvalidPathOrUrlError'
import { IValidator } from './protocols/IValidator'
import { IXmlMetadataLoadService } from './services/protocols/IXmlMetadataLoadService'
import { XmlMetadata } from './value-objects/XmlMetadata'

export interface IdpMetadataProps {
  source: 'file' | 'url'
  urlOrPath: string
  xmlMetadata?: XmlMetadata // criar outro valueObject
}

/**
 *
 */
export class IdpMetadata extends Entity<IdpMetadataProps> {
  private readonly urlOrPathValidator
  private readonly loadService
  /**
   * Automatically loads from source on object creation
   * @param props
   * @param urlOrPathValidator
   * @param loadService
   */
  constructor (
    props: IdpMetadataProps,
    urlOrPathValidator: IValidator,
    loadService: IXmlMetadataLoadService
  ) {
    super(props)
    this.urlOrPathValidator = urlOrPathValidator
    this.loadService = loadService

    if (!urlOrPathValidator.isValid(props.urlOrPath)) {
      throw new InvalidPathOrUrlError(props.urlOrPath)
    }
    this.load()
  }

  /**
     * load or fetch metadata
     */
  load (): void {
    this.props.xmlMetadata = this.loadService.load()
  }
}
