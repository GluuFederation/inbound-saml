import { decodeCredentials } from '@sp-proxy/frameworks-drivers/main/helpers/decodeCredentials'

describe('decodeCredentials', () => {
  it('should call Buffer from once with string', () => {
    const fromSpy = jest.spyOn(Buffer, 'from')
    decodeCredentials('any credentials')
    expect(fromSpy).toHaveBeenCalledTimes(1)
    expect(fromSpy).toHaveBeenCalledWith('any credentials', 'base64')
  })
})
