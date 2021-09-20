import { AddTrFromMetadataFacade } from '@sp-proxy/interface-adapters/api/AddTrFromMetadataFacade'
import { GetSamlFetchExternalData } from '@sp-proxy/interface-adapters/data/GetSamlFetchExternalData'
import { MongoAddTrustRelation } from '@sp-proxy/interface-adapters/data/MongoAddTrustRelation'
import { MongoCreateRemoteIdp } from '@sp-proxy/interface-adapters/data/MongoCreateRemoteIdp'
import { AddTrFromMetadataController } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataController'
import { AddTrFromMetadataPresenter } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataPresenter'
import { AddTrFromMetadataControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/AddTrFromMetadataControllerMapper'
import { AddTrFromMetadataPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/AddTrFromMetadataPresenterMapper'
import { AddTrFromMetadataValidator } from '@sp-proxy/interface-adapters/delivery/validators/AddTrFromMetadataValidator'
import { mockXmlEndpoints } from '@sp-proxy/interface-adapters/mocks/xmlEndpoints.mock'
import { AddTrFromMetadataInteractor } from '@sp-proxy/use-cases/AddTrFromMetadataInteractor'
import { RemoteIdpFromExternalDataFactory } from '@sp-proxy/use-cases/factories/RemoteIdpFromExternalDataFactory'
import { TrustRelationWithDefaultFactory } from '@sp-proxy/use-cases/factories/TrustRelationWithDefaultFactory'
import { Collection, MongoClient, Document as MongoDocument } from 'mongodb'
import nock from 'nock'
import { EventEmitter } from 'stream'
import config from '../config/env'

describe('AddTrFromMetadataFacade - integration', () => {
  const client = new MongoClient(config.database.mongo.uri)
  let connection: MongoClient
  let remoteIdpsCollection: Collection<MongoDocument>
  let trustRelationsCollection: Collection<MongoDocument>
  beforeAll(async () => {
    connection = await client.connect()
    remoteIdpsCollection = client
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.remoteIdps)
    trustRelationsCollection = client
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.trustRelations)
    mockXmlEndpoints()
  })
  afterAll(async () => {
    await trustRelationsCollection.drop()
    await connection.close()
    nock.cleanAll()
  })
  it('should return success message', async () => {
    const eventBus = new EventEmitter()
    const presenterMapper = new AddTrFromMetadataPresenterMapper()
    const presenter = new AddTrFromMetadataPresenter(presenterMapper, eventBus)

    const externalDataGateway = new GetSamlFetchExternalData()
    const remoteIdpFromExtDataFactory = new RemoteIdpFromExternalDataFactory()
    const createRemoteIdpGateway = new MongoCreateRemoteIdp(
      remoteIdpsCollection
    )
    const trWithDefaultFactory = new TrustRelationWithDefaultFactory()
    const addTrGateway = new MongoAddTrustRelation(trustRelationsCollection)
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
    const controller = new AddTrFromMetadataController(
      controllerMapper,
      interactor,
      controllerValidator
    )
    const sut = new AddTrFromMetadataFacade(controller, eventBus)
    const result = await sut.addTrFromMetadata({
      name: 'tr name',
      url: 'https://remoteIdp.com/metadata'
    })
    expect(result).toStrictEqual({ success: true })
  })
})
