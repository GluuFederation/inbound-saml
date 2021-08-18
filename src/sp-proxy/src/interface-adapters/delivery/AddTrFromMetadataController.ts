import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { InputBoundary } from '@sp-proxy/use-cases/io-channels/InputBoundary'
import { AddTrFromMetadataUseCaseProps } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseProps'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export class AddTrFromMetadataController implements IController {
  constructor(
    private readonly mapper: IDeliveryMapper<
      IRequest<IAddTrFromMetadataRequest>,
      IRequestModel<AddTrFromMetadataUseCaseProps>
    >,
    private readonly interactor: InputBoundary<AddTrFromMetadataUseCaseProps>,
    private readonly validator: IValidator
  ) {}

  async handle(request: IRequest<IAddTrFromMetadataRequest>): Promise<void> {
    await this.validator.isValid(request)
  }
}
