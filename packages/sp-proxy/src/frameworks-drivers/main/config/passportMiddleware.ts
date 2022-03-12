import { makeReadSpProxyConfigFacade } from '@sp-proxy/frameworks-drivers/main/factories/makeReadSpProxyConfigFacade'
import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'
import { IReadSpProxyConfigResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigResponse'
import { Request } from 'express'
import passport from 'passport'
import {
  MultiSamlStrategy,
  Profile,
  SamlConfig,
  VerifiedCallback,
  VerifyWithRequest
} from 'passport-saml/lib/passport-saml'
import { SamlOptionsCallback } from 'passport-saml/lib/passport-saml/types'
import { makeOxTrustGetTrByHostFacade } from '../factories/makeGetTrByHostFacade'
import { WinstonLogger } from '../logger/WinstonLogger'

const logger = WinstonLogger.getInstance()

passport.serializeUser((user: Express.User, done) => {
  done(null, user)
})

passport.deserializeUser((user: Express.User, done) => {
  done(null, user)
})

const makePassportConfig = (
  proxyConfig: IReadSpProxyConfigResponse,
  trustRelation: IGetTrByHostResponse
): SamlConfig => {
  const authnRequestBinding =
    trustRelation.selectedSsoService.binding ===
    'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
      ? 'HTTP-POST'
      : trustRelation.selectedSsoService.binding
  return {
    callbackUrl: `https://${proxyConfig.host}/inbound-saml/sp/callback`,
    // authnContext: [proxyConfig.authnContextIdentifierFormat],
    skipRequestCompression: proxyConfig.skipRequestCompression,
    identifierFormat:
      proxyConfig.requestedIdentifierFormat ??
      'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    // remote idp
    cert: trustRelation.remoteIdp.signingCertificates,
    decryptionPvk: proxyConfig.decryption.privateKey,
    authnRequestBinding: authnRequestBinding,
    entryPoint: trustRelation.selectedSsoService.location
  }
}

export const getSamlConfig = (): any => {
  logger.debug('Entered getSamlConfig')
  return async (request: Request, done: SamlOptionsCallback) => {
    try {
      const proxyConfigReader = makeReadSpProxyConfigFacade()
      const proxyConfig = await proxyConfigReader.do(null)
      const trGetter = makeOxTrustGetTrByHostFacade()
      let providerHost: string
      if (
        request.query.providerHost != null &&
        typeof request.query.providerHost === 'string'
      ) {
        providerHost = request.query.providerHost
      } else if (request.headers.origin != null) {
        providerHost = request.headers.origin
      } else {
        throw new Error('Provider Not Found in QS')
      }
      const trustRelation = await trGetter.getTrByHost(providerHost)

      const passportConfig = makePassportConfig(proxyConfig, trustRelation)
      logger.debug(
        `passportConfig = ${JSON.stringify(passportConfig, null, 4)}`
      )
      // return done?
      done(null, makePassportConfig(proxyConfig, trustRelation))
    } catch (err) {
      const error = err as Error
      logger.error(error.message)
      if (error.stack != null) {
        logger.error(error.stack)
      }
      done(err as Error)
    }
  }
}

export const verifyCallback: VerifyWithRequest = (
  req: Request,
  profile: Profile | null | undefined,
  done: VerifiedCallback
): void => {
  logger.debug('Entered verifyCallback')
  // if error, call done(err)
  if (profile != null) {
    logger.debug(`profile = ${JSON.stringify(profile, null, 4)}`)
    return done(null, profile)
  } else {
    return done(new Error('profile not found'))
  }
}

const strategy = new MultiSamlStrategy(
  {
    passReqToCallback: true,
    getSamlOptions: getSamlConfig()
  },
  verifyCallback
)

passport.use(strategy)

export default passport
