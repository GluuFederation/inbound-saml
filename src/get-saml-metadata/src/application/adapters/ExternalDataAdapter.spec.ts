import { fakeMetadata } from '../../../../testdata/fakes'
import { IExternalData } from '../protocols/IExternalData'
import { IMetadata } from '../protocols/IMetadataTypes'
import { ISingleSignOnService } from '../protocols/ISingleSignOnService'

class ExternalDataAdapter implements IExternalData {
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
    this._idpSigningCert = this.getAllCerts()
    this._singleSignOnServices = this.metadata.idpssoDescriptor.singleSignOnService
  }

  private getAllCerts (): string[] {
    const allCerts = []
    const keyDescriptors = this.metadata.idpssoDescriptor.keyDescriptor
    for (const keyDescriptorItem of keyDescriptors) {
      if ('use' in keyDescriptorItem) {
        if (keyDescriptorItem.use === 'signing') {
          allCerts.push(keyDescriptorItem.keyInfo.x509Data.x509Certificate)
        }
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

describe('ExternalDataAdapter', () => {
  it('should create an object that implements IExternalData w/ correct values', () => {
    const allCerts = []
    const keyDescriptors = fakeMetadata.idpssoDescriptor.keyDescriptor
    for (const keyDescriptorItem of keyDescriptors) {
      if ('use' in keyDescriptorItem) {
        if (keyDescriptorItem.use === 'signing') {
          allCerts.push(keyDescriptorItem.keyInfo.x509Data.x509Certificate)
        }
      }
    }
    const sut = new ExternalDataAdapter(fakeMetadata)
    expect(sut.idpSigningCert).toStrictEqual(allCerts)
    expect(sut.singleSignOnServices).toBe(fakeMetadata.idpssoDescriptor.singleSignOnService)
  })
})
