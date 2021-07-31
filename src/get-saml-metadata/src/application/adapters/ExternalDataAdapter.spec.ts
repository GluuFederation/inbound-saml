import { fakeMetadata } from '../../../../testdata/fakes'
import { IExternalData } from '../protocols/IExternalData'
import { IMetadata } from '../protocols/IMetadataTypes'
import { ISingleSignOnService } from '../protocols/ISingleSignOnService'
import { ExternalDataAdapter } from './ExternalDataAdapter'

// getFromFile(urlOrPath)
// idpMetadata = makeIdpMetadata(urlOrPath)

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
