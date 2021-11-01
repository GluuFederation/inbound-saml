import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IRequestModel } from './io-models/IRequestModel'
import { IResponseModel } from './io-models/IResponseModel'
import { ListTRsRequestUseCaseParams } from './io-models/ListTRsRequestUseCaseParams'
import { ListTRsResponseUseCaseParams } from './io-models/ListTRsResponseUseCaseParams'
import { IListTRsGateway } from './ports/IListTRsGateway'
import { InputBoundary } from './ports/InputBoundary'
import { OutputBoundary } from './ports/OutputBoundary'
import { IMapper } from './protocols/IMapper'

export class ListTRsInteractor
  implements InputBoundary<ListTRsRequestUseCaseParams>
{
  constructor(
    private readonly gateway: IListTRsGateway,
    private readonly mapper: IMapper<
      TrustRelation[],
      ListTRsResponseUseCaseParams
    >,
    private readonly outputChannel: OutputBoundary<
      IResponseModel<ListTRsResponseUseCaseParams>
    >
  ) {}

  async execute(
    requestModel: IRequestModel<ListTRsRequestUseCaseParams>
  ): Promise<void> {
    await this.gateway.findAll()
  }
}
