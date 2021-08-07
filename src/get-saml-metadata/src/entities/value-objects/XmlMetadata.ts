import { IValidator } from '@get-saml-metadata/entities/ports/IValidator'
import { ValueObject } from '@get-saml-metadata/entities/types/ValueObject'

export interface XmlMetadataProps {
  xml: string
}

export class XmlMetadata extends ValueObject<XmlMetadataProps> {
  private readonly validator
  constructor(validator: IValidator, props: XmlMetadataProps) {
    super(props)
    this.validator = validator
    this.validator.isValid(this)
  }
}
