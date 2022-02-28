import config from '@sp-proxy/interface-adapters/config/env'
import { GetSamlFetchExternalData } from '@sp-proxy/interface-adapters/data/GetSamlFetchExternalData'
import { JwtSigner } from '@sp-proxy/interface-adapters/data/helpers/JwtSigner'
import { TokenRequestFactory } from '@sp-proxy/interface-adapters/data/helpers/TokenRequestFactory'
import { UmaAuthenticator } from '@sp-proxy/interface-adapters/data/helpers/UmaAuthenticator'
import { UmaHeaderParser } from '@sp-proxy/interface-adapters/data/helpers/UmaHeaderParser'
import { AddTrustRelationOxTrustMapper } from '@sp-proxy/interface-adapters/data/mappers/AddTrustRelationOxTrustMapper'
import { OxTrustAddTrustRelation } from '@sp-proxy/interface-adapters/data/OxTrustAddTrustRelation'
import { AddTrFromMetadataController } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataController'
import { AddTrFromMetadataPresenter } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataPresenter'
import { AddTrFromMetadataControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/AddTrFromMetadataControllerMapper'
import { AddTrFromMetadataPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/AddTrFromMetadataPresenterMapper'
import { AddTrFromMetadataValidator } from '@sp-proxy/interface-adapters/delivery/validators/AddTrFromMetadataValidator'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { AddTrFromMetadataInteractor } from '@sp-proxy/use-cases/AddTrFromMetadataInteractor'
import { RemoteIdpFromExternalDataFactory } from '@sp-proxy/use-cases/factories/RemoteIdpFromExternalDataFactory'
import { TrustRelationWithDefaultFactory } from '@sp-proxy/use-cases/factories/TrustRelationWithDefaultFactory'
import { EventEmitter } from 'stream'

export const makeAddTrFromMetadataComposite = (
  eventBus: EventEmitter
): IController => {
  const presenterMapper = new AddTrFromMetadataPresenterMapper()
  const presenter = new AddTrFromMetadataPresenter(presenterMapper, eventBus)

  const externalDataGateway = new GetSamlFetchExternalData()
  const remoteIdpFromExtDataFactory = new RemoteIdpFromExternalDataFactory()

  const trWithDefaultFactory = new TrustRelationWithDefaultFactory()
  const addTrGateway = new OxTrustAddTrustRelation(
    config.oxTrustApi,
    new AddTrustRelationOxTrustMapper(),
    new UmaAuthenticator(
      new UmaHeaderParser(),
      new JwtSigner(),
      config.oxTrustApi,
      new TokenRequestFactory()
    )
  )
  const interactor = new AddTrFromMetadataInteractor(
    externalDataGateway,
    remoteIdpFromExtDataFactory,
    trWithDefaultFactory,
    addTrGateway,
    presenter
  )

  const controllerMapper = new AddTrFromMetadataControllerMapper()
  const controllerValidator = new AddTrFromMetadataValidator()
  return new AddTrFromMetadataController(
    controllerMapper,
    interactor,
    controllerValidator
  )
}
