import { CreateRemoteIdpFacade } from '@sp-proxy/interface-adapters/api/CreateRemoteIdpFacade'
import { MongoCreateRemoteIdp } from '@sp-proxy/interface-adapters/data/MongoCreateRemoteIdp'
import { CreateRemoteIdpController } from '@sp-proxy/interface-adapters/delivery/CreateRemoteIdpController'
import { CreateRemoteIdpPresenter } from '@sp-proxy/interface-adapters/delivery/CreateRemoteIdpPresenter'
import { CreateRemoteIdpControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/CreateRemoteIdpControllerMapper'
import { fakeCreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/mocks/fakeCreateRemoteIdpRequest.mock'
import { CreateRemoteIdpValidator } from '@sp-proxy/interface-adapters/delivery/validators/CreateRemoteIdpValidator'
import { CreateRemoteIdpInteractor } from '@sp-proxy/use-cases/CreateRemoteIdpInteractor'
import { CreateRemoteIdpUseCaseMapper } from '@sp-proxy/use-cases/mappers/CreateRemoteIdpUseCaseMapper'
import { Collection, MongoClient, Document as MongoDocument } from 'mongodb'
import { EventEmitter } from 'stream'
import config from '../data/config/env'

// create presenter with eventBus
// create interactor with presenter
// create controller with interactor
// create facade with controller and same eventBus from 1

describe('CreateRemoteIdpFacade - integration', () => {
  const client = new MongoClient(config.database.mongo.uri)
  let connection: MongoClient
  let collection: Collection<MongoDocument>
  beforeAll(async () => {
    connection = await client.connect()
    collection = client
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.remoteIdps)
  })
  afterAll(async () => {
    await connection.close()
  })
  /**
   * happy path
   */
  it('should return success message', async () => {
    // create composite
    const eventBus = new EventEmitter()
    const presenter = new CreateRemoteIdpPresenter(eventBus)

    // interactor...

    const gateway = new MongoCreateRemoteIdp(collection)
    const useCaseMapper = new CreateRemoteIdpUseCaseMapper()
    const interactor = new CreateRemoteIdpInteractor(
      gateway,
      presenter,
      useCaseMapper
    )

    const controllerMapper = new CreateRemoteIdpControllerMapper()
    const controllerValidator = new CreateRemoteIdpValidator()
    const controller = new CreateRemoteIdpController(
      controllerMapper,
      interactor,
      controllerValidator
    )
    const sut = new CreateRemoteIdpFacade(controller, eventBus)

    const actual = await sut.createRemoteIdp(fakeCreateRemoteIdpRequest.body)
    expect(actual).toStrictEqual({
      success: true
    })
  })
})
