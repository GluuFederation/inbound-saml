import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ILogger } from '@sp-proxy/interface-adapters/protocols/ILogger'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'

export class LogControllerDecorator implements IController {
  constructor(
    private readonly logger: ILogger,
    private readonly controller: IController
  ) {}

  async handle(request: IRequest<any>): Promise<void> {
    this.logger.debug(
      `${
        this.controller.constructor.name
      }: called handle method with ${JSON.stringify(request)}`
    )
    await this.controller.handle(request)
  }
}
