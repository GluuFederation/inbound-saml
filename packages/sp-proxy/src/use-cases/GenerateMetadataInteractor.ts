import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'
import { IReadProxyConfigGateway } from '@sp-proxy/use-cases/ports/IReadProxyConfigGateway'
import {
  IMetadataGenerator,
  IMetadataGeneratorParams
} from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataResponseUseCaseParams'
import { IXmlData } from '@sp-proxy/use-cases/protocols/IXmlData'
import { GenerateMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataRequestUseCaseParams'
import { ITransformer } from '@sp-proxy/use-cases/ports/ITransformer'
import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'

export class GenerateSpMetadataInteractor
  implements InputBoundary<GenerateMetadataRequestUseCaseParams>
{
  constructor(
    private readonly readProxyConfigGateway: IReadProxyConfigGateway,
    private readonly paramsTransformer: ITransformer<
      SpProxyConfigProps,
      IMetadataGeneratorParams
    >,
    private readonly metadataGenerator: IMetadataGenerator,
    private readonly metadataMapper: IMapper<
      IXmlData,
      GenerateMetadataResponseUseCaseParams
    >,
    private readonly output: OutputBoundary<
      IResponseModel<GenerateMetadataResponseUseCaseParams>
    >
  ) {}

  async execute(request: IRequestModel<'GenerateSpMetadata'>): Promise<void> {
    const spProxyConfig = await this.readProxyConfigGateway.read()
    const generatorParams = await this.paramsTransformer.transform(
      spProxyConfig.props
    )
    const xmlData = await this.metadataGenerator.generate(generatorParams)
    const useCaseProps = this.metadataMapper.map(xmlData)
    await this.output.present({
      requestId: request.requestId,
      response: useCaseProps
    })
  }
}
