import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { ICreateRemoteIdpInputBoundary } from '@sp-proxy/use-cases/io-channels/ICreateRemoteIdpInputBoundary'
import { ICreateRemoteIdpOutputBoundary } from '@sp-proxy/use-cases/io-channels/ICreateRemoteIdpOutputBoundary'
import { CreateRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/CreateRemoteIdpRequestModel'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'

export class CreateRemoteIdpInteractor
  implements ICreateRemoteIdpInputBoundary
{
  constructor(
    private readonly gateway: ICreateRemoteIdpGateway,
    private readonly output: ICreateRemoteIdpOutputBoundary
  ) {}

  async execute(request: CreateRemoteIdpRequestModel): Promise<void> {
    const ssoServicesVO = []
    for (const service of request.remoteIdp.singleSignOnService) {
      ssoServicesVO.push(makeSingleSignOnService(service))
    }
    const props: IRemoteIdpProps = {
      supportedSingleSignOnServices: ssoServicesVO,
      signingCertificates: request.remoteIdp.signingCertificates
    }
    const remoteIdp = new RemoteIdp(props)
    await this.gateway.create(remoteIdp)
  }
}
