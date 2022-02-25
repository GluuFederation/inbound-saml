import { UmaHeaderError } from '../errors/UmaHeaderError'
import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'
import { IWwwAuthenticate } from '../protocols/IWwwAuthenticate'

export class UmaHeaderParser implements IUmaHeaderParser {
  parse(wwwAuthenticateValue: string): IWwwAuthenticate {
    const splittedValues = wwwAuthenticateValue.split(', ')
    const umaRealm = splittedValues.find((item) => item.includes('UMA'))
    const hostId = splittedValues.find((item) => item.includes('host_id'))
    const asUri = splittedValues.find((item) => item.includes('as_uri'))
    const ticket = splittedValues.find((item) => item.includes('ticket'))
    if (umaRealm == null || hostId == null || asUri == null || ticket == null) {
      throw new UmaHeaderError('Missing values in www-authenticate header')
    } else {
      return {
        umaRealm: umaRealm.split('=')[1],
        hostId: hostId.split('=')[1],
        asUri: asUri.split('=')[1],
        ticket: ticket.split('=')[1]
      }
    }
  }
}
