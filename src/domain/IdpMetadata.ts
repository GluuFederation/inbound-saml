import { Entity } from './types/Entity'
import { InvalidPathOrUrlError } from './errors/InvalidPathOrUrlError'
import { IValidator } from './protocols/IValidator'
import { IMetadataLoadService } from './services/protocols/IMetadataLoadService'

export interface IdpMetadataProps {
  source: 'file' | 'url'
  urlOrPath: string
  data?: string // criar outro valueObject
}

export class IdpMetadata extends Entity<IdpMetadataProps> {
  private readonly urlOrPathValidator
  private readonly loadService
  constructor (
    props: IdpMetadataProps,
    urlOrPathValidator: IValidator,
    loadService: IMetadataLoadService
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
     * @abstract
     */
  load (): void {
    this.props.data = this.loadService.load()
  }
}
