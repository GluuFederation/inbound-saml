import { parse } from 'fast-xml-parser'
import { IDPSSODescriptor, IMetadata } from '../entities/IMetadataTypes'
import { IMetadataMapper } from '../use-cases/ports/IMetadataMapper'

export class MetadataMapperAdapter implements IMetadataMapper {
  options = { ignoreAttributes: false }
  private getIdpssoDescriptor (xmlData: string): IDPSSODescriptor {
    return parse(xmlData, this.options).EntityDescriptor.IDPSSODescriptor
  }

  /**
   * Maps xmlData (string) to IMetadata type/interface
   * @param xmlData
   * @returns metadata model (IMetadata)
   */
  map (xmlData: string): IMetadata {
    const metadata: IMetadata = {
      idpssoDescriptor: this.getIdpssoDescriptor(xmlData)
    }
    return metadata
  }
}
