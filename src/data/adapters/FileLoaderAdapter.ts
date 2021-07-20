import { readFileSync } from 'fs'
import { makeXmlMetadata } from '../../domain/factories/makeXmlMetadata'
import { IMetadataLoaderRepository } from '../../domain/utils/IMetadataLoaderRepository'
import { XmlMetadata } from '../../domain/value-objects/XmlMetadata'

/**
 * Creates a File Loader using `fs` that implements IMetadataLoaderRepository
 * @implements IMetadataLoaderRepositoryß
 */
export class FileLoaderAdapter implements IMetadataLoaderRepository {
  load (filePath: string): XmlMetadata {
    const xml = readFileSync(filePath).toString()
    return makeXmlMetadata({ xml })
  }
}
