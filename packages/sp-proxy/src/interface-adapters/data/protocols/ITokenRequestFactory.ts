import { IUmaTokenRequest } from './IUmaTokenRequest'
/**
 * Generates uma token request body with needed params
 *
 * @export
 * @interface ITokenRequestFactory
 */
export interface ITokenRequestFactory {
  make: (
    ticket: string,
    clientId: string,
    clientAssertion: string
  ) => IUmaTokenRequest
}
