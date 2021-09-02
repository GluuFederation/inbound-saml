import { LogControllerDecorator } from '@sp-proxy/interface-adapters/delivery/decorators/LogControllerDecorator'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ILogger } from '@sp-proxy/interface-adapters/protocols/ILogger'

export const makeLogControllerDecorator = (
  logger: ILogger,
  controller: IController
): IController => {
  return new LogControllerDecorator(logger, controller)
}
