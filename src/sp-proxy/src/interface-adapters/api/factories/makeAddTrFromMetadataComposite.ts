import { GetSamlFetchExternalData } from '@sp-proxy/interface-adapters/data/GetSamlFetchExternalData'
import { MongoAddTrustRelation } from '@sp-proxy/interface-adapters/data/MongoAddTrustRelation'
import { MongoCreateRemoteIdp } from '@sp-proxy/interface-adapters/data/MongoCreateRemoteIdp'
import { AddTrFromMetadataController } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataController'
import { AddTrFromMetadataPresenter } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataPresenter'
import { AddTrFromMetadataControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/AddTrFromMetadataControllerMapper'
import { AddTrFromMetadataPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/AddTrFromMetadataPresenterMapper'
import { AddTrFromMetadataValidator } from '@sp-proxy/interface-adapters/delivery/validators/AddTrFromMetadataValidator'
import { IController } from '@sp-proxy/interface-adapters/protocols/IController'
import { AddTrFromMetadataInteractor } from '@sp-proxy/use-cases/AddTrFromMetadataInteractor'
import { RemoteIdpFromExternalDataFactory } from '@sp-proxy/use-cases/factories/RemoteIdpFromExternalDataFactory'
import { TrustRelationWithDefaultFactory } from '@sp-proxy/use-cases/factories/TrustRelationWithDefaultFactory'
import { MongoClient } from 'mongodb'
import { EventEmitter } from 'stream'
import config from '@sp-proxy/interface-adapters/config/env'

export const makeAddTrFromMetadataComposite = (
  eventBus: EventEmitter
): IController => {
  const presenterMapper = new AddTrFromMetadataPresenterMapper()
  const presenter = new AddTrFromMetadataPresenter(presenterMapper, eventBus)

  const externalDataGateway = new GetSamlFetchExternalData()
  const remoteIdpFromExtDataFactory = new RemoteIdpFromExternalDataFactory()

  const client = new MongoClient(config.database.mongo.uri)
  const dataBase = client.db(config.database.mongo.dbName)
  const remoteIdpCollection = dataBase.collection(
    config.database.mongo.collections.remoteIdps
  )
  const trustRelationCollection = dataBase.collection(
    config.database.mongo.collections.trustRelations
  )
  const createRemoteIdpGateway = new MongoCreateRemoteIdp(remoteIdpCollection)
  const trWithDefaultFactory = new TrustRelationWithDefaultFactory()
  const addTrGateway = new MongoAddTrustRelation(trustRelationCollection)
  const interactor = new AddTrFromMetadataInteractor(
    externalDataGateway,
    remoteIdpFromExtDataFactory,
    createRemoteIdpGateway,
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
