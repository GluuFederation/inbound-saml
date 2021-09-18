import {
  IMetadataGenerator,
  IMetadataGeneratorParams
} from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { IXmlData } from '@sp-proxy/use-cases/protocols/IXmlData'
import { readFileSync } from 'fs'
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
        // decryptionPvk: params.decryption.privateKey,
        decryptionPvk: readFileSync(
          process.cwd() + '/packages/testdata/decryptionPvk.key'
        ).toString(),
        privateKey: params.signing?.privateKey
      },
      (profile: Profile | null | undefined, done: VerifiedCallback): void => {
        // dummy
      }
    )
    const decryptionCert = readFileSync(
      process.cwd() + '/packages/testdata/decryptionCert.pem',
      'utf-8'
    )
    return strategy.generateServiceProviderMetadata(
      decryptionCert,
      // params.decryption.publicCert,
      params.signing?.publicCert
    )
  }
}
