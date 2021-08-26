import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { GetTrByHostFacade } from '@sp-proxy/interface-adapters/api/GetTrByHostFacade'
import { GetTrByHostMongoMapper } from '@sp-proxy/interface-adapters/data/mappers/GetTrByHostMongoMapper'
import { makeRemoteIdpStub } from '@sp-proxy/interface-adapters/data/mocks/makeRemoteIdpStub.mock'
import { MongoGetTrByHost } from '@sp-proxy/interface-adapters/data/MongoGetTrByHost'
import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'
import { GetTrByHostController } from '@sp-proxy/interface-adapters/delivery/GetTrByHostController'
import { GetTrByHostPresenter } from '@sp-proxy/interface-adapters/delivery/GetTrByHostPresenter'
import { GetTrByHostControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetTrByHostControllerMapper'
import { GetTrByHostPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetTrByHostPresenterMapper'
import { GetTrByHostValidator } from '@sp-proxy/interface-adapters/delivery/validators/GetTrByHostValidator'
import { IService } from '@sp-proxy/interface-adapters/protocols/IService'
import { GetTrByHostInteractor } from '@sp-proxy/use-cases/GetTrByHostInteractor'
import { GetTrByHostUseCaseMapper } from '@sp-proxy/use-cases/mappers/GetTrByHostUseCaseMapper'
import { Collection, MongoClient, Document as MongoDocument } from 'mongodb'
import { EventEmitter } from 'stream'
import config from '../config/env'

const getSsoServices = (remoteIdp: RemoteIdp): IService[] => {
  const ssoServices: IService[] = []
  for (const ssoService of remoteIdp.props.supportedSingleSignOnServices) {
    ssoServices.push(ssoService.props)
  }
  return ssoServices
}

describe('GetTrByHostFacade - integration', () => {
  const client = new MongoClient(config.database.mongo.uri)
  let connection: MongoClient
  let collection: Collection<MongoDocument>
  beforeAll(async () => {
    connection = await client.connect()
    collection = client
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.trustRelations)
  })
  afterAll(async () => {
    await collection.drop()
    await connection.close()
  })
  it('should return expected trust relation props', async () => {
    // composite

    // presenter...
    const eventBus = new EventEmitter()
    const presenterMapper = new GetTrByHostPresenterMapper()
    const presenter = new GetTrByHostPresenter(presenterMapper, eventBus)

    // interactor...
    const dataMapper = new GetTrByHostMongoMapper()
    const gateway = new MongoGetTrByHost(collection, dataMapper)
    const entityMapper = new GetTrByHostUseCaseMapper()
    const interactor = new GetTrByHostInteractor(
      gateway,
      entityMapper,
      presenter
    )

    // controller...
    const validator = new GetTrByHostValidator()
    const controllerMapper = new GetTrByHostControllerMapper()
    const controller = new GetTrByHostController(
      controllerMapper,
      interactor,
      validator
    )

    // create data to be fetched in the database
    const trustRelationProps: ITrustRelationProps = {
      remoteIdp: makeRemoteIdpStub(),
      singleSignOnService: makeSingleSignOnService({
        binding: 'any binding',
        location: 'https://valid.host.com/any-path'
      })
    }

    const trustRelation = new TrustRelation(trustRelationProps)
    await collection.insertOne({ trustRelation })

    // assertions
    const sut = new GetTrByHostFacade(controller, eventBus)
    // const expectedRemoteIdp = makeRemoteIdpStub()
    const expected: IGetTrByHostResponse = {
      id: trustRelation.id,
      selectedSsoService: trustRelation.props.singleSignOnService.props,
      remoteIdp: {
        id: trustRelation.props.remoteIdp.id,
        name: trustRelation.props.remoteIdp.props.name,
        singleSignOnService: getSsoServices(trustRelation.props.remoteIdp),
        signingCertificates:
          trustRelation.props.remoteIdp.props.signingCertificates
      }
    }
    expect(await sut.getTrByHost('valid.host.com')).toStrictEqual(expected)
  })
})
