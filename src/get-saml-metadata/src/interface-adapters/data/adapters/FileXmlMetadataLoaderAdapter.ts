import { readFileSync } from 'fs'
import { XmlMetadata } from '../../../entities/value-objects/XmlMetadata'
import { IXmlMetadataLoaderGateway } from '../../../use-cases/ports/IXmlMetadataLoaderGateway'
import { makeXmlMetadata } from '../factories/makeXmlMetadata'

/**
 * Creates a File Loader using `fs` that implements IXmlMetadataLoaderGateway
 * @implements IXmlMetadataLoaderGateway
 */
export class FileXmlMetadataLoaderAdapter implements IXmlMetadataLoaderGateway {
  load (filePath: string): XmlMetadata {
    const xml = readFileSync(filePath).toString()
    return makeXmlMetadata({ xml })
  }
}
