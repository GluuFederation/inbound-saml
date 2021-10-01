import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { IKeyCertLoader } from '@sp-proxy/use-cases/protocols/IKeyCertLoader'
import { ReadSpProxyConfigResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigResponseUseCaseParams'
import { ITransformer } from '@sp-proxy/use-cases/ports/ITransformer'
import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'

export class ReadSpProxyConfigTransformer
  implements
    ITransformer<SpProxyConfig, ReadSpProxyConfigResponseUseCaseParams>
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
    spProxyConfig: SpProxyConfig
  ): Promise<ReadSpProxyConfigResponseUseCaseParams> {
    const decryptionCert = await this.formatter.format(
      await this.loader.load(spProxyConfig.props.decryption.publicCertPath)
    )
    const decryptionPrivateKey = await this.formatter.format(
      await this.loader.load(spProxyConfig.props.decryption.privateKeyPath)
    )
    const useCaseParams: ReadSpProxyConfigResponseUseCaseParams = {
      host: spProxyConfig.props.host,
      requestedIdentifierFormat: spProxyConfig.props.requestedIdentifierFormat,
      authnContextIdentifierFormat:
        spProxyConfig.props.authnContextIdentifierFormat,
      skipRequestCompression: spProxyConfig.props.skipRequestCompression,
      decryption: {
        privateKey: decryptionPrivateKey,
        cert: decryptionCert
      },
      postProfileUrl: spProxyConfig.props.postProfileUrl
    }
    if (spProxyConfig.props.signing != null) {
      useCaseParams.signing = {
        cert: await this.formatter.format(
          await this.loader.load(spProxyConfig.props.signing.publicCertPath)
        ),
        privateKey: await this.formatter.format(
          await this.loader.load(spProxyConfig.props.signing.privateKeyPath)
        )
      }
    }
    return useCaseParams
  }
}
