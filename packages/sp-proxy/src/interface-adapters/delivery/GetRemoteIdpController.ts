import { GetByIdDTO } from '@sp-proxy/interface-adapters/delivery/dtos/GetByIdDTO'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { GetRemoteIdpRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/GetRemoteIdpRequestUseCaseParams'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

export class GetRemoteIdpController implements IController {
  constructor(
    private readonly interactor: InputBoundary<GetRemoteIdpRequestUseCaseParams>,
    private readonly validator: IValidator,
    private readonly mapper: IDeliveryMapper<
      IRequest<GetByIdDTO>,
      IRequestModel<GetRemoteIdpRequestUseCaseParams>
    >
  ) {}

  async handle(request: IRequest<GetByIdDTO>): Promise<void> {
    await this.validator.isValid(request)
    const requestModel = this.mapper.map(request)
    await this.interactor.execute(requestModel)
  }
}
