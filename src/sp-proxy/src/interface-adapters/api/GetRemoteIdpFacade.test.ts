// create presenter with eventBus
// create interactor with presenter
// create controller with interactor
// create facade with controller and same eventBus from 1

import config from '../data/config/env'
import { Collection, MongoClient, Document as MongoDocument } from 'mongodb'
import { EventEmitter } from 'stream'
import { GetRemoteIdpPresenter } from '@sp-proxy/interface-adapters/delivery/GetRemoteIdpPresenter'
import { GetRemoteIdpPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetRemoteIdpPresenterMapper'
import { MongoGetRemoteIdp } from '@sp-proxy/interface-adapters/data/MongoGetRemoteIdp'
import { GetRemoteIdpMongoMapper } from '@sp-proxy/interface-adapters/data/mappers/GetRemoteIdpMongoMapper'
import { GetRemoteIdpInteractor } from '@sp-proxy/use-cases/GetRemoteIdpInteractor'
import { GetRemoteIdpUseCaseMapper } from '@sp-proxy/use-cases/utils/GetRemoteIdpUseCaseMapper'
import { GetRemoteIdpController } from '@sp-proxy/interface-adapters/delivery/GetRemoteIdpController'
import { GetByIdValidator } from '@sp-proxy/interface-adapters/delivery/validators/GetByIdValidator'
import { GetRemoteIdpControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetRemoteIdpControllerMapper'
import { GetRemoteIdpFacade } from '@sp-proxy/interface-adapters/api/GetRemoteIdpFacade'
import { makeRemoteIdpStub } from '@sp-proxy/interface-adapters/data/mocks/makeRemoteIdpStub.mock'
import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/protocols/RemoteIdpDeliveryProps'
import { IService } from '@sp-proxy/interface-adapters/protocols/IService'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'

const getSsoServices = (remoteIdp: RemoteIdp): IService[] => {
  const ssoServices: IService[] = []
  for (const ssoService of remoteIdp.props.supportedSingleSignOnServices) {
    ssoServices.push(ssoService.props)
  }
  return ssoServices
}

describe('GetRemoteIdpFacade - integration', () => {
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
  it('should return existing remote idp', async () => {
    const eventBus = new EventEmitter()
    const presenterMapper = new GetRemoteIdpPresenterMapper()
    const presenter = new GetRemoteIdpPresenter(presenterMapper, eventBus)

    // interactor:
    const dataMapper = new GetRemoteIdpMongoMapper()
    const gateway = new MongoGetRemoteIdp(collection, dataMapper)
    const entityMapper = new GetRemoteIdpUseCaseMapper()
    const interactor = new GetRemoteIdpInteractor(
      gateway,
      presenter,
      entityMapper
    )

    // controller...
    const validator = new GetByIdValidator()
    const controllerMapper = new GetRemoteIdpControllerMapper()
    const controller = new GetRemoteIdpController(
      interactor,
      validator,
      controllerMapper
    )

    // create data to be fetched in the database
    const remoteIdp = makeRemoteIdpStub()
    await collection.insertOne({ remoteIdp })

    // assertions
    const sut = new GetRemoteIdpFacade(controller, eventBus)
    const expected: RemoteIdpDeliveryProps = {
      id: remoteIdp.id,
      name: remoteIdp.props.name,
      singleSignOnService: getSsoServices(remoteIdp),
      signingCertificates: remoteIdp.props.signingCertificates
    }
    expect(await sut.getRemoteIdp(remoteIdp.id)).toEqual(expected)
  })
})
