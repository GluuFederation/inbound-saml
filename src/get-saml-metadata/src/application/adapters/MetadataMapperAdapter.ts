import { parse } from 'fast-xml-parser'
import { IMetadataMapper } from '../protocols/IMetadataMapper'
import { IDPSSODescriptor, IMetadata } from '../protocols/IMetadataTypes'

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
