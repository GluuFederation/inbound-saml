import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { IMapper } from '@sp-proxy/interface-adapters/protocols/IMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { ICreateRemoteIdpInputBoundary } from '@sp-proxy/use-cases/io-channels/ICreateRemoteIdpInputBoundary'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'

export class CreateRemoteIdpController implements IController {
  constructor(
    private readonly mapper: IMapper<
      ICreateRemoteIdpRequest,
      CreateRemoteIdpRequestModel
    >,
    private readonly interactor: ICreateRemoteIdpInputBoundary,
    private readonly validator: IValidator
  ) {}

  async handle(request: IRequest<ICreateRemoteIdpRequest>): Promise<void> {
    await this.validator.isValid(request)
    await this.interactor.execute(this.mapper.map(request))
  }
}