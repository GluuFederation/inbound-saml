import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { RemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'

export class CreateRemoteIdpController implements IController {
  constructor(
    private readonly mapper: IDeliveryMapper<
      ICreateRemoteIdpRequest,
      RemoteIdpUseCaseProps
    >,
    private readonly interactor: InputBoundary<RemoteIdpUseCaseProps>,
    private readonly validator: IValidator
  ) {}

  async handle(request: IRequest<ICreateRemoteIdpRequest>): Promise<void> {
    await this.validator.isValid(request)
    await this.interactor.execute(this.mapper.map(request))
  }
}
