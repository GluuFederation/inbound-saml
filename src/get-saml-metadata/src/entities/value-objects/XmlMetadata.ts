import { IValidator } from '../../use-cases/ports/IValidator'
import { ValueObject } from '../types/ValueObject'

export interface XmlMetadataProps {
  'xml': string
}

export class XmlMetadata extends ValueObject<XmlMetadataProps> {
  private readonly validator
  constructor (
    validator: IValidator,
    props: XmlMetadataProps
  ) {
    super(props)
    this.validator = validator
    this.validator.isValid(this)
  }
}
