import { ICreateRemoteIdpInputBoundary } from '@sp-proxy/use-cases/io-channels/ICreateRemoteIdpInputBoundary'
import { ICreateRemoteIdpOutputBoundary } from '@sp-proxy/use-cases/io-channels/ICreateRemoteIdpOutputBoundary'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import { CreateRemoteIdpMapper } from '@sp-proxy/use-cases/utils/CreateRemoteIdpMapper'

export class CreateRemoteIdpInteractor
  implements ICreateRemoteIdpInputBoundary
{
  constructor(
    private readonly gateway: ICreateRemoteIdpGateway,
    private readonly output: ICreateRemoteIdpOutputBoundary
  ) {}

  async execute(
    request: IRequestModel<CreateRemoteIdpRequestModel>
  ): Promise<void> {
    const mapper = new CreateRemoteIdpMapper()
    const mapped = mapper.map(request)
    await this.gateway.create(mapped)
  }
}
