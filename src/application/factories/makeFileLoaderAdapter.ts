import { FileLoaderAdapter } from '../../data/adapters/FileLoaderAdapter'
import { IXmlMetadataLoaderRepository } from '../../domain/utils/IXmlMetadataLoaderRepository'

export const makeFileLoaderAdapter = (): IXmlMetadataLoaderRepository => {
  return new FileLoaderAdapter()
}
