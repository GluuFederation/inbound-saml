import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/dtos/ICreateRemoteIdpRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { AddRemoteIdpRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/AddRemoteIdpRequestUseCaseParams'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

export class CreateRemoteIdpController implements IController {
  constructor(
    private readonly mapper: IDeliveryMapper<
      IRequest<ICreateRemoteIdpRequest>,
      IRequestModel<AddRemoteIdpRequestUseCaseParams>
    >,
    private readonly interactor: InputBoundary<AddRemoteIdpRequestUseCaseParams>,
    private readonly validator: IValidator
  ) {}

  async handle(request: IRequest<ICreateRemoteIdpRequest>): Promise<void> {
    await this.validator.isValid(request)
    await this.interactor.execute(this.mapper.map(request))
  }
}
