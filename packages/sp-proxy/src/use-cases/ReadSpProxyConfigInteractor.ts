import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { ReadSpProxyConfigRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigRequestUseCaseParams'
import { ReadSpProxyConfigResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigResponseUseCaseParams'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'
import { IReadProxyConfigGateway } from '@sp-proxy/use-cases/ports/IReadProxyConfigGateway'
import { ITransformer } from '@sp-proxy/use-cases/ports/ITransformer'
import { OutputBoundary } from '@sp-proxy/use-cases/ports/OutputBoundary'

export class ReadSpProxyConfigInteractor
  implements InputBoundary<ReadSpProxyConfigRequestUseCaseParams>
{
  constructor(
    private readonly gateway: IReadProxyConfigGateway,
    private readonly transformer: ITransformer<
      SpProxyConfig,
      IResponseModel<ReadSpProxyConfigResponseUseCaseParams>
    >,
    private readonly outputBoundary: OutputBoundary<ReadSpProxyConfigResponseUseCaseParams>
  ) {}

  async execute(
    request: IRequestModel<ReadSpProxyConfigRequestUseCaseParams>
  ): Promise<void> {
    const spProxyConfig = await this.gateway.read()
    await this.transformer.transform(spProxyConfig)
  }
}
