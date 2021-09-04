import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { IKeyCertLoader } from '@sp-proxy/use-cases/protocols/IKeyCertLoader'
import { IMetadataGeneratorParams } from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { ITransformer } from '@sp-proxy/use-cases/ports/ITransformer'
import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'

/**
 *
 * Responsible for trnasforming configuration props to passport metadata generator
 * Loads files from paths and format strings accordingly
 * @export
 * @class GenerateMetadataTransformer
 * @implements {ITransformer<SpProxyConfigProps, IMetadataGeneratorParams>}
 */
export class GenerateMetadataTransformer
  implements ITransformer<SpProxyConfigProps, IMetadataGeneratorParams>
{
  /**
   * Creates an instance of GenerateMetadataTransformer.
   * @param {IKeyCertLoader} loader
   * @param {IKeyCertFormatter} formatter
   * @memberof GenerateMetadataTransformer
   */
  constructor(
    private readonly loader: IKeyCertLoader,
    private readonly formatter: IKeyCertFormatter
  ) {}

  // SP decryption pvk and cert is mandatory to generate valid metadata
  // Signing pvk and certs are not mandatory, but if exists, both should exist
  async transform(
    spProxyConfigProps: SpProxyConfigProps
  ): Promise<IMetadataGeneratorParams> {
    const decryptionCert = await this.formatter.format(
      await this.loader.load(spProxyConfigProps.decryption.publicCertPath)
    )
    const decryptionPvk = await this.formatter.format(
      await this.loader.load(spProxyConfigProps.decryption.privateKeyPath)
    )

    const generatorParams: IMetadataGeneratorParams = {
      callbackUrl: `https://${spProxyConfigProps.host}/inbound-saml/sp/callback`,
      requestedIdentifierFormat: spProxyConfigProps.requestedIdentifierFormat,
      authnContextIdentifierFormat:
        spProxyConfigProps.authnContextIdentifierFormat,
      skipRequestCompression: spProxyConfigProps.skipRequestCompression,
      decryption: {
        publicCert: decryptionCert,
        privateKey: decryptionPvk
      }
    }
    // if signing exists, add to params
    if (spProxyConfigProps.signing != null) {
      generatorParams.signing = {
        publicCert: await this.formatter.format(
          await this.loader.load(spProxyConfigProps.signing.publicCertPath)
        ),
        privateKey: await this.formatter.format(
          await this.loader.load(spProxyConfigProps.signing.privateKeyPath)
        )
      }
    }
    return generatorParams
  }
}
