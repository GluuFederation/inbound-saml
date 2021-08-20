import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { IKeyCertLoader } from '@sp-proxy/interface-adapters/protocols/IKeyCertLoader'
import { IKeyCertFormatter } from '@sp-proxy/interface-adapters/protocols/IKeySetFormatter'
import { IMetadataGeneratorParams } from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { ITransformer } from '@sp-proxy/use-cases/ports/ITransformer'

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

  async transform(
    spProxyConfigProps: SpProxyConfigProps
  ): Promise<IMetadataGeneratorParams> {
    await this.formatter.format(
      await this.loader.load(spProxyConfigProps.decryption.publicCertPath)
    )
    if (spProxyConfigProps.decryption.privateKeyPath != null) {
      await this.formatter.format(
        await this.loader.load(spProxyConfigProps.decryption.privateKeyPath)
      )
    }
    if (spProxyConfigProps.signing?.publicCertPath != null) {
      await this.formatter.format(
        await this.loader.load(spProxyConfigProps.signing?.publicCertPath)
      )
    }
    if (spProxyConfigProps.signing?.privateKeyPath != null) {
      await this.formatter.format(
        await this.loader.load(spProxyConfigProps.signing?.privateKeyPath)
      )
    }
    return {
      host: '',
      requestedIdentifierFormat: '',
      authnContextIdentifierFormat: '',
      skipRequestCompression: false,
      decryption: {
        publicCert: '',
        privateKey: ''
      },
      signing: {
        publicCert: '',
        privateKey: ''
      }
    }
  }
}
