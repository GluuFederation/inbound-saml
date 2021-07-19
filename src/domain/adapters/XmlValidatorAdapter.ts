import { IValidator } from '../protocols/IValidator'
import { XmlMetadata } from '../value-objects/XmlMetadata'
import { parseString } from 'xml2js'
import { parse } from 'uuid'

export class XmlValidatorAdapter implements IValidator {
  public isValid (xmlMetadata: XmlMetadata): boolean {
    parseString(xmlMetadata.props.xml, (err, result) => {
      if (err !== undefined) {
        //
      }
      if (result !== undefined) {
        //
      }
    })
    return true
  }
}
