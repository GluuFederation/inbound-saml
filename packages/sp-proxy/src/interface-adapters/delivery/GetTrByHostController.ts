import { IGetTrByHostRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { GetTrByHostRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/GetTrByHostRequestUseCaseParams'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

export class GetTrByHostController implements IController {
  constructor(
    private readonly requestMapper: IDeliveryMapper<
      IRequest<IGetTrByHostRequest>,
      IRequestModel<GetTrByHostRequestUseCaseParams>
    >,
    private readonly interactor: InputBoundary<GetTrByHostRequestUseCaseParams>,
    private readonly validator: IValidator
  ) {}

  async handle(request: IRequest<any>): Promise<void> {
    await this.validator.isValid(request)
    const requestModel = this.requestMapper.map(request)
    await this.interactor.execute(requestModel)
  }
}
