import { GetByIdDTO } from '@sp-proxy/interface-adapters/protocols/GetByIdDTO'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { GetRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/GetRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class GetRemoteIdpController implements IController {
  constructor(
    private readonly interactor: InputBoundary<GetRemoteIdpRequestModel>,
    private readonly validator: IValidator,
    private readonly mapper: IDeliveryMapper<
      IRequest<GetByIdDTO>,
      IRequestModel<GetRemoteIdpRequestModel>
    >
  ) {}

  async handle(request: IRequest<GetByIdDTO>): Promise<void> {
    await this.validator.isValid(request)
  }
}
