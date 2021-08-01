import { FileXmlMetadataLoaderAdapter } from '../../data/adapters/FileXmlMetadataLoaderAdapter'
import { IXmlMetadataLoaderGateway } from '../../use-cases/ports/IXmlMetadataLoaderGateway'

export const makeFileXmlMetadataLoaderAdapter = (): IXmlMetadataLoaderGateway => {
  return new FileXmlMetadataLoaderAdapter()
}
