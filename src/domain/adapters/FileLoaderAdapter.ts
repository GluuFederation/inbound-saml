import { readFileSync } from 'fs'
import { IMetadataLoader } from '../value-objects/protocols/IMetadataLoader'

export class FileLoaderAdapter implements IMetadataLoader {
  load (filePath: string): string {
    return readFileSync(filePath).toString()
  }
}
