import { IReadSpProxyConfigRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { ReadSpProxyConfigRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/ReadSpProxyConfigRequestUseCaseParams'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

export class ReadSpProxyConfigController implements IController {
  constructor(
    private readonly mapper: IDeliveryMapper<
      IRequest<IReadSpProxyConfigRequest>,
      IRequestModel<ReadSpProxyConfigRequestUseCaseParams>
    >,
    private readonly interactor: InputBoundary<ReadSpProxyConfigRequestUseCaseParams>
  ) {}

  async handle(request: IRequest<IReadSpProxyConfigRequest>): Promise<void> {
    const requestModel = this.mapper.map(request)
    await this.interactor.execute(requestModel)
  }
}
