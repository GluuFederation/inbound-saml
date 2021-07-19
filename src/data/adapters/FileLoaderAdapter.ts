import { readFileSync } from 'fs'
import { IMetadataLoaderRepository } from '../../domain/utils/IMetadataLoaderRepository'

/**
 * Creates a File Loader using `fs` that implements IMetadataLoaderRepository
 * @implements IMetadataLoaderRepository
 */
export class FileLoaderAdapter implements IMetadataLoaderRepository {
  load (filePath: string): string {
    return readFileSync(filePath).toString()
  }
}
