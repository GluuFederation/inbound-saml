import { IUmaTokenRequest } from './IUmaTokenRequest'

export interface ITokenRequestFactory {
  make: (ticket: string, clientId: string) => IUmaTokenRequest
}
