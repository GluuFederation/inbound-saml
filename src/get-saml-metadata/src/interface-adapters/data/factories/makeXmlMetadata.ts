import { XmlMetadata, XmlMetadataProps } from '@get-saml-metadata/entities/value-objects/XmlMetadata'
import { XmlValidatorAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/XmlValidatorAdapter'

export const makeXmlMetadata = (props: XmlMetadataProps): XmlMetadata => {
  const xmlValidator = new XmlValidatorAdapter()
  return new XmlMetadata(xmlValidator, props)
}
