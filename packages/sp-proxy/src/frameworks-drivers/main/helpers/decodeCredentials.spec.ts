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
  it('should call split from returned string', () => {
    const splitSpy = jest.spyOn(String.prototype, 'split')
    decodeCredentials('any credentials')
    expect(splitSpy).toHaveBeenCalledTimes(1)
    expect(splitSpy).toHaveBeenCalledWith(':')
  })
  it('return expected values', () => {
    jest
      .spyOn(String.prototype, 'split')
      .mockReturnValueOnce(['validUser', 'validPassword'])
    expect(decodeCredentials('any creds')).toStrictEqual({
      user: 'validUser',
      password: 'validPassword'
    })
  })
})
