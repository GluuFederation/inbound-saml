import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { ILogger } from '@sp-proxy/interface-adapters/protocols/ILogger'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'

export class LogAddTrGatewayDecorator implements IAddTrGateway {
  constructor(
    private readonly logger: ILogger,
    private readonly gateway: IAddTrGateway
  ) {}

  async add(trustRelation: TrustRelation): Promise<boolean> {
    this.logger.info(
      `${this.gateway.constructor.name}: Creating Trust Relation ${trustRelation.props.remoteIdp.props.host} in persistence...`
    )
    this.logger.debug(
      `${
        this.gateway.constructor.name
      }: create() called with trustRelation = ${JSON.stringify(
        trustRelation,
        null,
        4
      )} `
    )
    return await this.gateway.add(trustRelation)
  }
}
