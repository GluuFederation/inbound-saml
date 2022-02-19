import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'
import { IWwwAuthenticate } from '../protocols/IWwwAuthenticate'

export class UmaHeaderParser implements IUmaHeaderParser {
  parse(wwwAuthenticateValue: string): IWwwAuthenticate {
    wwwAuthenticateValue.split(', ')
    return '' as any
  }
}
