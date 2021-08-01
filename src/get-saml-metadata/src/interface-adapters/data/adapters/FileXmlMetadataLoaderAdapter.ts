import { readFileSync } from 'fs'
import { XmlMetadata } from '../../../entities/value-objects/XmlMetadata'
import { IXmlMetadataLoaderRepository } from '../../../use-cases/ports/IXmlMetadataLoaderRepository'
import { makeXmlMetadata } from '../factories/makeXmlMetadata'

/**
 * Creates a File Loader using `fs` that implements IXmlMetadataLoaderRepository
 * @implements IXmlMetadataLoaderRepository
 */
export class FileXmlMetadataLoaderAdapter implements IXmlMetadataLoaderRepository {
  load (filePath: string): XmlMetadata {
    const xml = readFileSync(filePath).toString()
    return makeXmlMetadata({ xml })
  }
}
