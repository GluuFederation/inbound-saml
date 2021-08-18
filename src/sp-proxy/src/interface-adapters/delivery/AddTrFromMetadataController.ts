import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { AddTrFromMetadataUseCaseParams } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

export class AddTrFromMetadataController implements IController {
  constructor(
    private readonly mapper: IDeliveryMapper<
      IRequest<IAddTrFromMetadataRequest>,
      IRequestModel<AddTrFromMetadataUseCaseParams>
    >,
    private readonly interactor: InputBoundary<AddTrFromMetadataUseCaseParams>,
    private readonly validator: IValidator
  ) {}

  async handle(request: IRequest<IAddTrFromMetadataRequest>): Promise<void> {
    await this.validator.isValid(request)
    const useCaseRequestModel = this.mapper.map(request)
    await this.interactor.execute(useCaseRequestModel)
  }
}
