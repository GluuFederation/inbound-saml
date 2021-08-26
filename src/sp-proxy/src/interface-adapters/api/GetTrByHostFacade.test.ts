import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { makeGetTrByHostComposite } from '@sp-proxy/interface-adapters/api/factories/makeGetTrByHostComposite'
import { GetTrByHostFacade } from '@sp-proxy/interface-adapters/api/GetTrByHostFacade'
import { makeRemoteIdpStub } from '@sp-proxy/interface-adapters/data/mocks/makeRemoteIdpStub.mock'
import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { IService } from '@sp-proxy/interface-adapters/protocols/IService'
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
    const eventBus = new EventEmitter()
    const controller = makeGetTrByHostComposite(collection, eventBus)

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
  it('should throw for unexistant host', async () => {
    const eventBus = new EventEmitter()
    const controller = makeGetTrByHostComposite(collection, eventBus)
    const sut = new GetTrByHostFacade(controller, eventBus)
    await expect(sut.getTrByHost('notexistant.co.uk')).rejects.toThrow()
  })
  it('should throw InvalidRequestError for invalid host', async () => {
    const eventBus = new EventEmitter()
    const controller = makeGetTrByHostComposite(collection, eventBus)
    const sut = new GetTrByHostFacade(controller, eventBus)
    await expect(sut.getTrByHost('')).rejects.toThrow(InvalidRequestError)
  })
})
