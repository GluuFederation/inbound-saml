import { parsedByToolIdpSSODescriptor, validMetadataString } from '../../../../testdata/fakes'
import { IMetadata, KeyDescriptor, Service } from '../../entities/IMetadataTypes'
import { MetadataMapperAdapter } from './MetadataMapperAdapter'

function isMetadata (metadata: IMetadata): metadata is IMetadata {
  if (
    'keyDescriptor' in metadata.idpssoDescriptor &&
    'singleSignOnService' in metadata.idpssoDescriptor
  ) { return true } else { return false }
}

const getKeyDescriptor = (idpssoDescriptor: any): KeyDescriptor[] => {
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

const getSSOServices = (idpssoDescriptor: any): Service[] => {
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

describe('MetadataMapperAdapter', () => {
  it('should map valid xml data to valid IMetadata object', () => {
    const sut = new MetadataMapperAdapter()
    const result = sut.map(validMetadataString)
    expect(isMetadata(result)).toBeTruthy()
  })
  it('should return the expected IMetadataObject', () => {
    const sut = new MetadataMapperAdapter()
    const result = sut.map(validMetadataString)
    const expected: IMetadata = {
      idpssoDescriptor: {
        keyDescriptor: getKeyDescriptor(parsedByToolIdpSSODescriptor),
        singleSignOnService: getSSOServices(parsedByToolIdpSSODescriptor)
      }
    }
    expect(isMetadata(result)).toBeTruthy()
    expect(result).toStrictEqual(expected)
  })
})
