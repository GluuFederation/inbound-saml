import { BaseKeyCertFormatter } from '@sp-proxy/use-cases/protocols/BaseKeyCertFormatter'

describe('BaseKeyCertFormatter', () => {
  it('should NOT call replace with correct values', async () => {
    const fakeString = 'any string'
    const replaceSpy = jest.spyOn(String.prototype, 'replace')
    class ConcreteKeyCertFormater extends BaseKeyCertFormatter {}
    const sut = new ConcreteKeyCertFormater()
    await sut.format(fakeString)
    expect(replaceSpy).toHaveBeenCalledTimes(0)
    expect(replaceSpy).not.toHaveBeenCalledWith(/(\r\n|\n|\r)/gm, '')
    expect(replaceSpy).not.toHaveBeenCalledWith(
      '-----BEGIN CERTIFICATE-----',
      ''
    )
    expect(replaceSpy).not.toHaveBeenCalledWith('-----END CERTIFICATE-----', '')
    expect(replaceSpy).not.toHaveBeenCalledWith(
      '-----BEGIN ENCRYPTED PRIVATE KEY-----',
      ''
    )
    expect(replaceSpy).not.toHaveBeenCalledWith(
      '-----END ENCRYPTED PRIVATE KEY-----',
      ''
    )
  })
})
