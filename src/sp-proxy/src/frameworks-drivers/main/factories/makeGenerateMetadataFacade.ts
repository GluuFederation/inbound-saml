import { makeGenerateMetadataComposite } from '@sp-proxy/interface-adapters/api/factories/makeGenerateMetadataComposite'
import { GenerateMetadataFacade } from '@sp-proxy/interface-adapters/api/GenerateMetadataFacade'
import { EventEmitter } from 'stream'

export const makeGenerateMetadataFacade = (): GenerateMetadataFacade => {
  const eventBus = new EventEmitter()
  const controller = makeGenerateMetadataComposite(eventBus)
  return new GenerateMetadataFacade(controller, eventBus)
}
