import { readFileSync } from 'fs'
import { makeXmlMetadata } from '../factories/makeXmlMetadata'
import { IXmlMetadataLoaderRepository } from '../../use-cases/ports/IXmlMetadataLoaderRepository'
import { XmlMetadata } from '../../entities/value-objects/XmlMetadata'

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
