import { readFileSync } from 'fs'
import { makeXmlMetadata } from '../../domain/factories/makeXmlMetadata'
import { IXmlMetadataLoaderRepository } from '../../domain/utils/IXmlMetadataLoaderRepository'
import { XmlMetadata } from '../../domain/value-objects/XmlMetadata'

/**
 * Creates a File Loader using `fs` that implements IXmlMetadataLoaderRepository
 * @implements IXmlMetadataLoaderRepository
 */
export class FileLoaderAdapter implements IXmlMetadataLoaderRepository {
  load (filePath: string): XmlMetadata {
    const xml = readFileSync(filePath).toString()
    return makeXmlMetadata({ xml })
  }
}
