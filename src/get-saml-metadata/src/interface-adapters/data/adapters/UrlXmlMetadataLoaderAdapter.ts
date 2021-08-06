import { XmlMetadata } from '@get-saml-metadata/entities/value-objects/XmlMetadata'
import { makeXmlMetadata } from '@get-saml-metadata/interface-adapters/data/factories/makeXmlMetadata'
import { IXmlMetadataLoaderGateway } from '@get-saml-metadata/use-cases/ports/IXmlMetadataLoaderGateway'
import axios from 'axios'

/**
 * Adapts loader gateway to be used with external axios lib
 */
export class UrlXmlMetadataLoaderAdapter implements IXmlMetadataLoaderGateway {
  async load (url: string): Promise<XmlMetadata> {
    const response = await axios.get(url)
    return (makeXmlMetadata({ xml: response.data }))
  }
}
