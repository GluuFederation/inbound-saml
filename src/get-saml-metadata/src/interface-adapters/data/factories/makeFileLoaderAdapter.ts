import { FileXmlMetadataLoaderAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/FileXmlMetadataLoaderAdapter'
import { IXmlMetadataLoaderGateway } from '@get-saml-metadata/use-cases/ports/IXmlMetadataLoaderGateway'

export const makeFileXmlMetadataLoaderAdapter = (): IXmlMetadataLoaderGateway => {
  return new FileXmlMetadataLoaderAdapter()
}
