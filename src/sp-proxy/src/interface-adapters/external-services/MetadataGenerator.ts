import {
  IMetadataGenerator,
  IMetadataGeneratorParams
} from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { IXmlData } from '@sp-proxy/use-cases/protocols/IXmlData'
import { Profile, Strategy, VerifiedCallback } from 'passport-saml'

export class MetadataGenerator implements IMetadataGenerator {
  async generate(params: IMetadataGeneratorParams): Promise<IXmlData> {
    const strategy = new Strategy(
      {
        callbackUrl: params.callbackUrl,
        identifierFormat: params.requestedIdentifierFormat,
        authnContext: [params.authnContextIdentifierFormat],
        skipRequestCompression: params.skipRequestCompression,
        cert: 'dummy value',
        decryptionPvk: params.decryption.privateKey
      },
      (profile: Profile | null | undefined, done: VerifiedCallback) => {
        return done(null)
      }
    )
    strategy.generateServiceProviderMetadata(params.decryption.publicCert)
    return ''
  }
}
