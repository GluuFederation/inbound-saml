import { ITokenRequestFactory } from '../protocols/ITokenRequestFactory'
import { IUmaTokenRequest } from '../protocols/IUmaTokenRequest'

export class TokenRequestFactory implements ITokenRequestFactory {
  make(
    ticket: string,
    clientId: string,
    clientAssertion: string
  ): IUmaTokenRequest {
    const request: IUmaTokenRequest = {
      grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      ticket: ticket,
      client_id: clientId,
      client_assertion_type:
        'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: clientAssertion,
      scope: 'oxtrust-api-read oxtrust-api-write'
    }
    return request
  }
}
