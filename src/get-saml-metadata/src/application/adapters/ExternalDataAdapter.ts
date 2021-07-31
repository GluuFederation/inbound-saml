import { IExternalData } from '../protocols/IExternalData'
import { IMetadata, KeyDescriptor } from '../protocols/IMetadataTypes'
import { ISingleSignOnService } from '../protocols/ISingleSignOnService'

/**
 * Adapts Metadata (IMetadata) to IExternalData
 */
export class ExternalDataAdapter implements IExternalData {
  // adaptee
  private readonly metadata: IMetadata
  private readonly _idpSigningCert
  private readonly _singleSignOnServices
  /**
   * Metadata to be adapted to IExternalData
   * @param metadata
   */
  constructor (
    metadata: IMetadata
  ) {
    this.metadata = metadata
    this._idpSigningCert = this.getAllCerts(
      this.metadata.idpssoDescriptor.keyDescriptor
    )
    this._singleSignOnServices = this.metadata.idpssoDescriptor.singleSignOnService
  }

  /**
   * get all certificates from keyDescriptors
   * @param keydescriptors
   * @returns certificates array
   */
  private getAllCerts (keydescriptors: KeyDescriptor[]): string[] {
    const allCerts = []
    const keyDescriptors = this.metadata.idpssoDescriptor.keyDescriptor
    for (const keyDescriptorItem of keyDescriptors) {
      if (keyDescriptorItem.use === 'signing') {
        allCerts.push(keyDescriptorItem.keyInfo.x509Data.x509Certificate)
      }
    }
    return allCerts
  }

  get idpSigningCert (): string[] {
    return this._idpSigningCert
  }

  get singleSignOnServices (): ISingleSignOnService[] {
    return this._singleSignOnServices
  }
}
