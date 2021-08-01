import { validate } from 'fast-xml-parser'
import { XmlMetadata } from '../../../entities/value-objects/XmlMetadata'
import { IValidator } from '../../../use-cases/ports/IValidator'

/**
 * Adapt to external fast-xml-parser module
 */
export class XmlValidatorAdapter implements IValidator {
  public isValid (xmlMetadata: XmlMetadata): boolean {
    if (validate(xmlMetadata.props.xml) === true) {
      return true
    }
    return false
  }
}
