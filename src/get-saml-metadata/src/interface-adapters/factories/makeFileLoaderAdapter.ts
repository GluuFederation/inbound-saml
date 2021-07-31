import { FileXmlMetadataLoaderAdapter } from '../../data/adapters/FileXmlMetadataLoaderAdapter'
import { IXmlMetadataLoaderRepository } from '../../domain/utils/IXmlMetadataLoaderRepository'

export const makeFileXmlMetadataLoaderAdapter = (): IXmlMetadataLoaderRepository => {
  return new FileXmlMetadataLoaderAdapter()
}
