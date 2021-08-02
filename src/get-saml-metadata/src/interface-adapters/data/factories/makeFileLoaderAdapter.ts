import { IXmlMetadataLoaderGateway } from '../../../use-cases/ports/IXmlMetadataLoaderGateway'
import { FileXmlMetadataLoaderAdapter } from '../../data/adapters/FileXmlMetadataLoaderAdapter'

export const makeFileXmlMetadataLoaderAdapter = (): IXmlMetadataLoaderGateway => {
  return new FileXmlMetadataLoaderAdapter()
}
