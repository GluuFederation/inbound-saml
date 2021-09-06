import { makeMongoGetTrByHostFacade } from '@sp-proxy/frameworks-drivers/main/factories/makeGetTrByHostFacade'
import { makeReadSpProxyConfigFacade } from '@sp-proxy/frameworks-drivers/main/factories/makeReadSpProxyConfigFacade'
import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'
import { IReadSpProxyConfigResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigResponse'
import { Request } from 'express'
import { MongoClient } from 'mongodb'
import passport from 'passport'

import {
  MultiSamlStrategy,
  Profile,
  SamlConfig,
  VerifiedCallback,
  VerifyWithRequest
} from 'passport-saml/lib/passport-saml'
import cfg from '@sp-proxy/interface-adapters/config/env'
import { SamlOptionsCallback } from 'passport-saml/lib/passport-saml/types'

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
    authnContext: [proxyConfig.authnContextIdentifierFormat],
    skipRequestCompression: proxyConfig.skipRequestCompression,
    identifierFormat:
      proxyConfig.requestedIdentifierFormat ??
      'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    // remote idp
    cert: trustRelation.remoteIdp.signingCertificates,
    authnRequestBinding: authnRequestBinding,
    entryPoint: trustRelation.selectedSsoService.location
  }
}

export const getSamlConfig = () => {
  return async (request: Request, done: SamlOptionsCallback) => {
    let connected: MongoClient
    try {
      const proxyConfigReader = makeReadSpProxyConfigFacade()
      const proxyConfig = await proxyConfigReader.do(null)
      const mongoClient = new MongoClient(cfg.database.mongo.uri)
      connected = await mongoClient.connect()
      const collection = connected
        .db(cfg.database.mongo.dbName)
        .collection(cfg.database.mongo.collections.trustRelations)
      const trGetter = makeMongoGetTrByHostFacade(collection)
      if (
        request.query.providerHost != null &&
        typeof request.query.providerHost === 'string'
      ) {
        const trustRelation = await trGetter.getTrByHost(
          request.query.providerHost
        )
        await connected.close()
        return done(null, makePassportConfig(proxyConfig, trustRelation))
      } else {
        throw new Error('Provider Not Found in QS')
      }
    } catch (err) {
      done(err as Error)
    }
  }
}

const verifyCallback: VerifyWithRequest = (
  req: Request,
  profile: Profile | null | undefined,
  done: VerifiedCallback
): void => {
  // if error, call done(err)
  if (profile != null) {
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
