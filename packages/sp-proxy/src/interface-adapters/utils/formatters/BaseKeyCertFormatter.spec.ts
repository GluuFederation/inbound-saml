import { BaseKeyCertFormatter } from '@sp-proxy/interface-adapters/utils/formatters/BaseKeyCertFormatter'

describe('BaseKeyCertFormatter', () => {
  it('should call replace with correct values', async () => {
    const fakeString = 'any string'
    const replaceSpy = jest.spyOn(String.prototype, 'replace')
    class ConcreteKeyCertFormater extends BaseKeyCertFormatter {}
    const sut = new ConcreteKeyCertFormater()
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
