import { FileLoaderAdapter } from '../adapters/FileLoaderAdapter'
import { IMetadataLoader } from '../utils/IMetadataLoader'

export const makeFileLoaderAdapter = (): IMetadataLoader => {
  return new FileLoaderAdapter()
}
