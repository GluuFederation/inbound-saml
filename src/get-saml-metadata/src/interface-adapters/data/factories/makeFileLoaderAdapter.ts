import { FileXmlMetadataLoaderAdapter } from '../../data/adapters/FileXmlMetadataLoaderAdapter'
import { IXmlMetadataLoaderRepository } from '../../use-cases/ports/IXmlMetadataLoaderRepository'

export const makeFileXmlMetadataLoaderAdapter = (): IXmlMetadataLoaderRepository => {
  return new FileXmlMetadataLoaderAdapter()
}
