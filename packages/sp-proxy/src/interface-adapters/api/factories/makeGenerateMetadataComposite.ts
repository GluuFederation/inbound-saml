import { FileReadProxyConfig } from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
import { GenerateMetadataController } from '@sp-proxy/interface-adapters/delivery/GenerateMetadataController'
import { GenerateMetadataPresenter } from '@sp-proxy/interface-adapters/delivery/GenerateMetadataPresenter'
import { GenerateMetadataControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GenerateMetadataControllerMapper'
import { GenerateMetadataPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GenerateMetadataPresenterMapper'
import { KeyCertLoader } from '@sp-proxy/interface-adapters/external-services/KeyCertLoader'
import { MetadataGenerator } from '@sp-proxy/interface-adapters/external-services/MetadataGenerator'
import { GenerateMetadataTransformer } from '@sp-proxy/interface-adapters/transformers/GenerateMetadataTransformer'
import { GenerateMetadataFormatter } from '@sp-proxy/interface-adapters/utils/GenerateMetadataFormatter'
import { GenerateSpMetadataInteractor } from '@sp-proxy/use-cases/GenerateMetadataInteractor'
import { GenerateMetadataUseCaseMapper } from '@sp-proxy/use-cases/mappers/GenerateMetadataUseCaseMapper'
import { EventEmitter } from 'stream'

/**
 * Generates controller composite
 * @param eventBus
 * @returns controller
 */
export const makeGenerateMetadataComposite = (
  eventBus: EventEmitter
): GenerateMetadataController => {
  const presenterMapper = new GenerateMetadataPresenterMapper()
  const presenter = new GenerateMetadataPresenter(presenterMapper, eventBus)

  const fileReadProxyConfig = new FileReadProxyConfig()

  const keyCertLoader = new KeyCertLoader()
  const formatter = new GenerateMetadataFormatter()
  const paramsTransformer = new GenerateMetadataTransformer(
    keyCertLoader,
    formatter
  )

  const externalMetadataGenerator = new MetadataGenerator()
  const useCaseMapper = new GenerateMetadataUseCaseMapper()
  const interactor = new GenerateSpMetadataInteractor(
    fileReadProxyConfig,
    paramsTransformer,
    externalMetadataGenerator,
    useCaseMapper,
    presenter
  )

  const controllerMapper = new GenerateMetadataControllerMapper()

  return new GenerateMetadataController(controllerMapper, interactor)
}
