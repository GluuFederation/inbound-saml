import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IAddTrFromMetadataRequest'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { AddTrFromMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/AddTrFromMetadataRequestUseCaseParams'
import { InputBoundary } from '@sp-proxy/use-cases/ports/InputBoundary'

export class AddTrFromMetadataController implements IController {
  constructor(
    private readonly mapper: IDeliveryMapper<
      IRequest<IAddTrFromMetadataRequest>,
      IRequestModel<AddTrFromMetadataRequestUseCaseParams>
    >,
    private readonly interactor: InputBoundary<AddTrFromMetadataRequestUseCaseParams>,
    private readonly validator: IValidator
  ) {}

  async handle(request: IRequest<IAddTrFromMetadataRequest>): Promise<void> {
    await this.validator.isValid(request)
    const useCaseRequestModel = this.mapper.map(request)
    await this.interactor.execute(useCaseRequestModel)
  }
}
