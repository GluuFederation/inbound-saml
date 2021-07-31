import { fakeMetadata } from '../../../../testdata/fakes'
import { ExternalDataMapper } from './ExternalDataMapper'

// getFromFile(urlOrPath)
// idpMetadata = makeIdpMetadata(urlOrPath)

describe('ExternalDataMapper', () => {
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
    const sut = new ExternalDataMapper()
    const result = sut.map(fakeMetadata)
    expect(result.idpSigningCert).toStrictEqual(allCerts)
    expect(result.singleSignOnServices).toBe(fakeMetadata.idpssoDescriptor.singleSignOnService)
  })
})
