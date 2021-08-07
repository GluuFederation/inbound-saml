import { FileXmlMetadataLoaderAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/FileXmlMetadataLoaderAdapter'
import { UrlXmlMetadataLoaderAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/UrlXmlMetadataLoaderAdapter'
import { SourceType } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IXmlMetadataLoaderGateway } from '@get-saml-metadata/use-cases/ports/IXmlMetadataLoaderGateway'

/**
 * Creates XmlMetadataLoader for file or url according to arg
 * @param source (file or url)
 * @returns loader (gateway)
 */
export const makeXmlMetadataLoaderAdapter = (
  source: SourceType
): IXmlMetadataLoaderGateway => {
  switch (source) {
    case 'file': {
      return new FileXmlMetadataLoaderAdapter()
    }
    case 'url': {
      return new UrlXmlMetadataLoaderAdapter()
    }
  }
}
