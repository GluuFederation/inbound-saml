import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { IKeyCertLoader } from '@sp-proxy/use-cases/protocols/IKeyCertLoader'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { ReadSpProxyConfigResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigResponseUseCaseParams'
import { ITransformer } from '@sp-proxy/use-cases/ports/ITransformer'
import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'

export class ReadSpProxyConfigUseCaseTransformer
  implements
    ITransformer<
      SpProxyConfig,
      IResponseModel<ReadSpProxyConfigResponseUseCaseParams>
    >
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
  ): Promise<IResponseModel<ReadSpProxyConfigResponseUseCaseParams>> {
    await this.loader.load(spProxyConfig.props.decryption.publicCertPath)
    await this.loader.load(spProxyConfig.props.decryption.privateKeyPath)
    if (spProxyConfig.props.signing != null) {
      await this.loader.load(spProxyConfig.props.signing?.privateKeyPath)
      await this.loader.load(spProxyConfig.props.signing?.publicCertPath)
    }
    return {
      requestId: '',
      response: {
        host: 'string',
        requestedIdentifierFormat: 'string',
        authnContextIdentifierFormat: 'string',
        skipRequestCompression: true,
        decryption: {
          privateKey: 'string',
          cert: 'string'
        }
      }
    }
  }
}
