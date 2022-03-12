import cfg from '../../config/env'
import { JwtSigner } from '../helpers/JwtSigner'
import { TokenRequestFactory } from '../helpers/TokenRequestFactory'
import { UmaAuthenticator } from '../helpers/UmaAuthenticator'
import { UmaHeaderParser } from '../helpers/UmaHeaderParser'
import { IUmaAuthenticator } from '../protocols/IUmaAuthenticator'

/**
 * Factory method for UmaAuthenticator
 * @returns UmaAuthenticator
 */
export const makeUmaAuthenticator = (): IUmaAuthenticator => {
  return new UmaAuthenticator(
    new UmaHeaderParser(),
    new JwtSigner(),
    cfg.oxTrustApi,
    new TokenRequestFactory()
  )
}
