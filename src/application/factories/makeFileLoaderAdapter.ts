import { FileLoaderAdapter } from '../../data/adapters/FileLoaderAdapter'
import { IMetadataLoaderRepository } from '../../domain/utils/IMetadataLoaderRepository'

export const makeFileLoaderAdapter = (): IMetadataLoaderRepository => {
  return new FileLoaderAdapter()
}
