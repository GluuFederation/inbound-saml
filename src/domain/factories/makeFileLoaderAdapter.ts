import { FileLoaderAdapter } from '../adapters/FileLoaderAdapter'
import { IMetadataLoader } from '../value-objects/protocols/IMetadataLoader'

export const makeFileLoaderAdapter = (): IMetadataLoader => {
  return new FileLoaderAdapter()
}
