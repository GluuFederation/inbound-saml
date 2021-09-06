import { FileReadProxyConfig } from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
import { ReadSpProxyConfigControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/ReadSpProxyConfigControllerMapper'
import { ReadSpProxyConfigPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/ReadSpProxyConfigPresenterMapper'
import { ReadSpProxyConfigController } from '@sp-proxy/interface-adapters/delivery/ReadSpProxyConfigController'
import { ReadSpProxyConfigPresenter } from '@sp-proxy/interface-adapters/delivery/ReadSpProxyConfigPresenter'
import { KeyCertLoader } from '@sp-proxy/interface-adapters/external-services/KeyCertLoader'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { ReadSpProxyConfigFormatter } from '@sp-proxy/interface-adapters/utils/formatters/ReadSpProxyConfigFormatter'
import { ReadSpProxyConfigTransformer } from '@sp-proxy/interface-adapters/utils/transformers/ReadSpProxyConfigTransformer'
import { ReadSpProxyConfigInteractor } from '@sp-proxy/use-cases/ReadSpProxyConfigInteractor'
import { EventEmitter } from 'stream'

/**
 * Create composite needed for Controller
 * to fetch SP Proxy configuration from file persistence
 * @returns {ReadSpProxyConfigController}
 */
export const makeReadSpProxyConfigComposite = (
  eventBus: EventEmitter
): IController => {
  const presenterMapper = new ReadSpProxyConfigPresenterMapper()
  const presenter = new ReadSpProxyConfigPresenter(presenterMapper, eventBus)

  const gateway = new FileReadProxyConfig()
  const loader = new KeyCertLoader()
  const formatter = new ReadSpProxyConfigFormatter()
  const transformer = new ReadSpProxyConfigTransformer(loader, formatter)
  const interactor = new ReadSpProxyConfigInteractor(
    gateway,
    transformer,
    presenter
  )

  const controllerMapper = new ReadSpProxyConfigControllerMapper()
  return new ReadSpProxyConfigController(controllerMapper, interactor)
}
