// .replace(/(\r\n|\n|\r)/gm, '')
// .replace('-----BEGIN CERTIFICATE-----', '')
// .replace('-----END CERTIFICATE-----', '')

import { GenerateMetadataFormatter } from '@sp-proxy/interface-adapters/utils/GenerateMetadataFormatter'

describe('GenerateMetadataTransformer', () => {
  it('should call replace with correct values', async () => {
    const fakeString = 'any string'
    const replaceSpy = jest.spyOn(String.prototype, 'replace')
    const sut = new GenerateMetadataFormatter()
    await sut.format(fakeString)
    expect(replaceSpy).toHaveBeenCalledTimes(5)
    expect(replaceSpy).toHaveBeenCalledWith(/(\r\n|\n|\r)/gm, '')
    expect(replaceSpy).toHaveBeenCalledWith('-----BEGIN CERTIFICATE-----', '')
    expect(replaceSpy).toHaveBeenCalledWith('-----END CERTIFICATE-----', '')
    expect(replaceSpy).toHaveBeenCalledWith(
      '-----BEGIN ENCRYPTED PRIVATE KEY-----',
      ''
    )
    expect(replaceSpy).toHaveBeenCalledWith(
      '-----END ENCRYPTED PRIVATE KEY-----',
      ''
    )
  })
})
