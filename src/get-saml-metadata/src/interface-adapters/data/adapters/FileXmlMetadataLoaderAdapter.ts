
import { XmlMetadata } from '@get-saml-metadata/entities/value-objects/XmlMetadata'
import { makeXmlMetadata } from '@get-saml-metadata/interface-adapters/data/factories/makeXmlMetadata'
import { IXmlMetadataLoaderGateway } from '@get-saml-metadata/use-cases/ports/IXmlMetadataLoaderGateway'
import { readFileSync } from 'fs'

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
