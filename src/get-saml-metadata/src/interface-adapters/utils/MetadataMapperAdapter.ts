import { parse } from 'fast-xml-parser'
import { IDPSSODescriptor, IMetadata, KeyDescriptor, Service } from '../../entities/IMetadataTypes'
import { IMetadataMapper } from '../../use-cases/ports/IMetadataMapper'

/**
 * Uses fast-xml-parser
 */
export class MetadataMapperAdapter implements IMetadataMapper {
  options = { ignoreAttributes: false }

  private readonly getKeyDescriptor = (idpssoDescriptor: any): KeyDescriptor[] => {
    const keyDescriptors = []
    for (const keyDescriptor of idpssoDescriptor.KeyDescriptor) {
      if (keyDescriptor['@_use'] === 'signing') {
        const kd = {
          use: keyDescriptor['@_use'],
          keyInfo: {
            x509Data: {
              x509Certificate: keyDescriptor['ds:KeyInfo']['ds:X509Data']['ds:X509Certificate']
            }
          }
        }
        keyDescriptors.push(kd)
      }
    }
    return keyDescriptors
  }

  private readonly getSSOServices = (idpssoDescriptor: any): Service[] => {
    const services = []
    for (const service of idpssoDescriptor.SingleSignOnService) {
      const srvc: Service = {
        binding: service['@_Binding'],
        location: service['@_Location']
      }
      services.push(srvc)
    }
    return services
  }

  private getIdpssoDescriptor (xmlData: string): IDPSSODescriptor {
    const parsed = parse(xmlData, this.options).EntityDescriptor.IDPSSODescriptor
    return {
      keyDescriptor: this.getKeyDescriptor(parsed),
      singleSignOnService: this.getSSOServices(parsed)
    }
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
