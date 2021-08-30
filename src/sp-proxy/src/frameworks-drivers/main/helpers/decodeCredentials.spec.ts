import { decodeCredentials } from '@sp-proxy/frameworks-drivers/main/helpers/decodeCredentials'

describe('decodeCredentials', () => {
  it('should call Buffer from once with string', () => {
    const fromSpy = jest.spyOn(Buffer, 'from')
    decodeCredentials('any credentials')
    expect(fromSpy).toHaveBeenCalledTimes(1)
    expect(fromSpy).toHaveBeenCalledWith('any credentials', 'base64')
  })
  it('should call toString from returned value', () => {
    const returnedValue = Buffer.from('returned value')
    jest.spyOn(Buffer, 'from').mockReturnValueOnce(returnedValue)
    const toStringSpy = jest.spyOn(returnedValue, 'toString')
    decodeCredentials('any credentials')
    expect(toStringSpy).toHaveBeenCalledTimes(1)
  })
})
