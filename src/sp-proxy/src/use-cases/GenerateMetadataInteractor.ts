import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { IReadProxyConfigGateway } from '@sp-proxy/use-cases/ports/IReadProxyConfigGateway'
import { IMetadataGenerator } from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { IResponseModel } from '@get-saml-metadata/use-cases/IResponseModel'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataResponseUseCaseParams'
import { IXmlData } from '@sp-proxy/use-cases/protocols/IXmlData'
import { GenerateMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataRequestUseCaseParams'

export class GenerateSpMetadataInteractor
  implements InputBoundary<GenerateMetadataRequestUseCaseParams>
{
  constructor(
    private readonly readProxyConfigGateway: IReadProxyConfigGateway,
    private readonly metadataGenerator: IMetadataGenerator,
    private readonly metadataMapper: IMapper<
      IXmlData,
      IResponseModel<GenerateMetadataResponseUseCaseParams>
    >,
    private readonly output: OutputBoundary<
      IResponseModel<GenerateMetadataResponseUseCaseParams>
    >
  ) {}

  async execute(request: IRequestModel<'GenerateSpMetadata'>): Promise<void> {
    const spProxyConfig = await this.readProxyConfigGateway.read()
    const xmlData = await this.metadataGenerator.generate(
      {
        certPath: spProxyConfig.props.decryption.publicCertPath,
        privateKeyPath: spProxyConfig.props.decryption.privateKeyPath
      },
      {
        certPath: spProxyConfig.props.signing.publicCertPath,
        privateKeyPath: spProxyConfig.props.signing.privateKeyPath
      }
    )
    const responseModel = this.metadataMapper.map(xmlData)
    await this.output.present(responseModel)
  }
}
