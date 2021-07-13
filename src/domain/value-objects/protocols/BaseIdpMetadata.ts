import { IProvider } from '../../entities/protocols/IProvider'
import { ValueObject } from './ValueObject'

export interface IIdpMetadata {
  source: 'file' | 'url'
  urlOrPath: string
  data?: IProvider // criar outro valueObject
}

export abstract class BaseIdpMetadata extends ValueObject<IIdpMetadata> {
  constructor (props: IIdpMetadata) {
    super(props)
    this.load()
  }

  /**
     * load or fetch metadata
     * @abstract
     */
  abstract load (): void
}
