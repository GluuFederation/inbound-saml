import { XmlMetadata } from '@get-saml-metadata/entities/value-objects/XmlMetadata'
import { IValidator } from '@get-saml-metadata/use-cases/ports/IValidator'
import { validate } from 'fast-xml-parser'

/**
 * Adapt to external fast-xml-parser module
 */
export class XmlValidatorAdapter implements IValidator {
  public isValid (xmlMetadata: XmlMetadata): boolean {
    if (validate(xmlMetadata.props.xml) === true) {
      return true
    } else {
      throw new Error()
    }
  }
}
