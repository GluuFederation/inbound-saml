import { IWwwAuthenticate } from './IWwwAuthenticate'

export interface IUmaHeaderParser {
  parse: (wwwAuthenticateValue: string) => IWwwAuthenticate
}
