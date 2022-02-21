import { IUmaTokenRequest } from '../protocols/IUmaTokenRequest'
import { TokenRequestFactory } from './TokenRequestFactory'

describe('TokenRequestFactory', () => {
  it('should return UmaTokenRequest', () => {
    const sut = new TokenRequestFactory()
    const expected: IUmaTokenRequest = {
      grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      ticket: 'valid ticket',
      client_id: 'valid client id',
      client_assertion_type:
        'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: 'valid assertion',
      scope: 'oxtrust-api-read oxtrust-api-write'
    }
    expect(
      sut.make('valid ticket', 'valid client id', 'valid assertion')
    ).toEqual(expected)
  })
})
