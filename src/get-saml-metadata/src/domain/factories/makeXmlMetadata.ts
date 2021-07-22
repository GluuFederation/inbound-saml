import { XmlValidatorAdapter } from '../adapters/XmlValidatorAdapter'
import { XmlMetadata, XmlMetadataProps } from '../value-objects/XmlMetadata'

export const makeXmlMetadata = (props: XmlMetadataProps): XmlMetadata => {
  const xmlValidator = new XmlValidatorAdapter()
  return new XmlMetadata(xmlValidator, props)
}
