import { GetByIdDTO } from '@sp-proxy/interface-adapters/protocols/GetByIdDTO'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { InputBoundary } from '@sp-proxy/use-cases/protocols/InputBoundary'
import { GetRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/GetRemoteIdpUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class GetRemoteIdpController implements IController {
  constructor(
    private readonly interactor: InputBoundary<GetRemoteIdpUseCaseParams>,
    private readonly validator: IValidator,
    private readonly mapper: IDeliveryMapper<
      IRequest<GetByIdDTO>,
      IRequestModel<GetRemoteIdpUseCaseParams>
    >
  ) {}

  async handle(request: IRequest<GetByIdDTO>): Promise<void> {
    await this.validator.isValid(request)
    const requestModel = this.mapper.map(request)
    await this.interactor.execute(requestModel)
  }
}
