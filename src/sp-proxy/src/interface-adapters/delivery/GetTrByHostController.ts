import { IGetTrByHostRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { GetTrByHostRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostRequestUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

export class GetTrByHostController implements IController {
  constructor(
    private readonly requestMapper: IDeliveryMapper<
      IRequest<IGetTrByHostRequest>,
      IRequestModel<GetTrByHostRequestUseCaseParams>
    >,
    private readonly interactor: InputBoundary<GetTrByHostRequestUseCaseParams>
  ) {}

  async handle(request: IRequest<any>): Promise<void> {
    this.requestMapper.map(request)
  }
}
