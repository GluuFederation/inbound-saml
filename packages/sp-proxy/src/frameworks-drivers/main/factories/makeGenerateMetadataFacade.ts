import { WinstonLogger } from '@sp-proxy/frameworks-drivers/main/logger/WinstonLogger'
import { makeGenerateMetadataComposite } from '@sp-proxy/interface-adapters/api/factories/makeGenerateMetadataComposite'
import { GenerateMetadataFacade } from '@sp-proxy/interface-adapters/api/GenerateMetadataFacade'
import { makeLogControllerDecorator } from '@sp-proxy/interface-adapters/delivery/factories/makeLogControllerDecorator'
import { EventEmitter } from 'stream'

export const makeGenerateMetadataFacade = (): GenerateMetadataFacade => {
  const eventBus = new EventEmitter()
  const controller = makeLogControllerDecorator(
    WinstonLogger.getInstance(),
    makeGenerateMetadataComposite(eventBus)
  )
  return new GenerateMetadataFacade(controller, eventBus)
}
