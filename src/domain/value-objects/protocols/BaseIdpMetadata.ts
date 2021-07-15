import { InvalidPathOrUrlError } from '../../errors/InvalidPathOrUrlError'
import { IValidator } from '../../protocols/IValidator'
import { IMetadataLoadService } from '../../services/protocols/IMetadataLoadService'
import { ValueObject } from './ValueObject'

export interface IIdpMetadata {
  source: 'file' | 'url'
  urlOrPath: string
  data?: string // criar outro valueObject
}

export abstract class BaseIdpMetadata extends ValueObject<IIdpMetadata> {
  private readonly urlOrPathValidator
  private readonly loadService
  constructor (
    props: IIdpMetadata,
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
