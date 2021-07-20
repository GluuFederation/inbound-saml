import { IValidator } from '../protocols/IValidator'
import { XmlMetadata } from '../value-objects/XmlMetadata'
import { validate } from 'fast-xml-parser'

export class XmlValidatorAdapter implements IValidator {
  public isValid (xmlMetadata: XmlMetadata): boolean {
    if (validate(xmlMetadata.props.xml) === true) {
      return true
    }
    return false
  }
}
