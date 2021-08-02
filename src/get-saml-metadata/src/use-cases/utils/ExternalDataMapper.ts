import { IExternalData } from '../../entities/IExternalData'
import { IMetadata, KeyDescriptor } from '../../entities/IMetadataTypes'
import { IExternalDataMapper } from '../ports/IExternalDataMapper'

/**
 * Maps Metadata (IMetadata) to IExternalData
 */
export class ExternalDataMapper implements IExternalDataMapper {
  public map (metadata: IMetadata): IExternalData {
    return {
      idpSigningCert: this.getAllCerts(metadata.idpssoDescriptor.keyDescriptor),
      singleSignOnServices: metadata.idpssoDescriptor.singleSignOnService
    }
  }

  /**
   * get all certificates from keyDescriptors
   * @param keydescriptors
   * @returns certificates array
   */
  private getAllCerts (keyDescriptors: KeyDescriptor[]): string[] {
    const allCerts = []
    for (const keyDescriptorItem of keyDescriptors) {
      if (keyDescriptorItem.use === 'signing') {
        allCerts.push(keyDescriptorItem.keyInfo.x509Data.x509Certificate)
      }
    }
    return allCerts
  }
}