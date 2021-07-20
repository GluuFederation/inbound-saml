import { IValidator } from '../protocols/IValidator'
import { XmlMetadata } from '../value-objects/XmlMetadata'
import * as parser from 'fast-xml-parser'

export class XmlValidatorAdapter implements IValidator {
  public isValid (xmlMetadata: XmlMetadata): boolean {
    if (parser.validate(xmlMetadata.props.xml) === true) {
      // implement
    }
    return false
  }
}
