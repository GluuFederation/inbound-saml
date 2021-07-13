import { IProvider } from '../../entities/protocols/IProvider'
import { IValidator } from '../../protocols/IValidator'
import { ValueObject } from './ValueObject'

export interface IIdpMetadata {
  source: 'file' | 'url'
  urlOrPath: string
  data?: IProvider // criar outro valueObject
}

export abstract class BaseIdpMetadata extends ValueObject<IIdpMetadata> {
  readonly urlOrPathValidator
  constructor (
    props: IIdpMetadata,
    urlOrPathValidator: IValidator
  ) {
    super(props)
    this.urlOrPathValidator = urlOrPathValidator
    if (!urlOrPathValidator.isValid(props.urlOrPath)) {
      throw new Error()
    }
    this.load()
  }

  /**
     * load or fetch metadata
     * @abstract
     */
  abstract load (): void
}
