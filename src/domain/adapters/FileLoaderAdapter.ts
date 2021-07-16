import { readFileSync } from 'fs'
import { IMetadataLoader } from '../utils/IMetadataLoader'


/**
 * Creates a File Loader that implements IMetadataLoader
 * @implements IMetadataLoader
 */
export class FileLoaderAdapter implements IMetadataLoader {
  load (filePath: string): string {
    return readFileSync(filePath).toString()
  }
}
