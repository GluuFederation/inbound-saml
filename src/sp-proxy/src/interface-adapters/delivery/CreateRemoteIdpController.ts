import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { InputBoundary } from '@sp-proxy/use-cases/protocols/InputBoundary'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { AddRemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'

export class CreateRemoteIdpController implements IController {
  constructor(
    private readonly mapper: IDeliveryMapper<
      IRequest<ICreateRemoteIdpRequest>,
      IRequestModel<AddRemoteIdpUseCaseParams>
    >,
    private readonly interactor: InputBoundary<AddRemoteIdpUseCaseParams>,
    private readonly validator: IValidator
  ) {}

  async handle(request: IRequest<ICreateRemoteIdpRequest>): Promise<void> {
    await this.validator.isValid(request)
    await this.interactor.execute(this.mapper.map(request))
  }
}
