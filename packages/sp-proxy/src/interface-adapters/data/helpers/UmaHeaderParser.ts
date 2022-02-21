import { UmaHeaderError } from '../errors/UmaHeaderError'
import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'
import { IWwwAuthenticate } from '../protocols/IWwwAuthenticate'

export class UmaHeaderParser implements IUmaHeaderParser {
  parse(wwwAuthenticateValue: string): IWwwAuthenticate {
    const splittedValues = wwwAuthenticateValue.split(', ')
    const umaRealm = splittedValues.find((item) => item.includes('UMA'))
    const hostId = splittedValues.find((item) => item.includes('host_id'))
    const asUri = splittedValues.find((item) => item.includes('as_uri'))
    if (umaRealm == null || hostId == null || asUri == null) {
      throw new UmaHeaderError('Missing values in www-authenticate header')
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const umaRealmValue = umaRealm.split('=')[1]
    }
    return '' as any
  }
}
