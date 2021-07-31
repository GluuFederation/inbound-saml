import { XmlMetadata, XmlMetadataProps } from '../../entities/value-objects/XmlMetadata'
import { XmlValidatorAdapter } from '../adapters/XmlValidatorAdapter'

export const makeXmlMetadata = (props: XmlMetadataProps): XmlMetadata => {
  const xmlValidator = new XmlValidatorAdapter()
  return new XmlMetadata(xmlValidator, props)
}
