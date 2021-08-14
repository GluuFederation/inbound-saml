import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/protocols/ICreateRemoteIdpRequest'
import { IMapper } from '@sp-proxy/interface-adapters/protocols/IMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'

export class CreateRemoteIdpController implements IController {
  constructor(
    private readonly mapper: IMapper<
      ICreateRemoteIdpRequest,
      CreateRemoteIdpRequestModel
    >,
    private readonly interactor: InputBoundary<CreateRemoteIdpRequestModel>,
    private readonly validator: IValidator
  ) {}

  async handle(request: IRequest<ICreateRemoteIdpRequest>): Promise<void> {
    await this.validator.isValid(request)
    await this.interactor.execute(this.mapper.map(request))
  }
}
