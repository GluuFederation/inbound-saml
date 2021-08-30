import routes from '@sp-proxy/frameworks-drivers/main/routes'
import express from 'express'
import request from 'supertest'
import { mockSpProxyConfig } from '@sp-proxy/frameworks-drivers/main/mocks/mockSpProxyConfig.mock'
import { AddTrFromMetadataController } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataController'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { mockValidXmlDataEndpoint } from '@sp-proxy/frameworks-drivers/main/mocks/externalMetadataUrl.mock'
import nock from 'nock'
import { Collection, MongoClient } from 'mongodb'
import config from '@sp-proxy/interface-adapters/config/env'
jest.mock('@sp-proxy/interface-adapters/data/FileReadProxyConfig')

const app = express()

app.use(express.json())
describe('addTrFromMetadataRouter', () => {
  let mongoClient: MongoClient
  let connection: MongoClient
  let collection: Collection
  beforeAll(async () => {
    // setup app and db for testing this route
    mongoClient = new MongoClient(config.database.mongo.uri)
    connection = await mongoClient.connect()
    collection = connection
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.trustRelations)
    app.use(routes)
    mockSpProxyConfig()
  })
  afterAll(async () => {
    await connection.close()
    jest.clearAllMocks()
    nock.cleanAll()
  })
  const endpoint = '/inbound-saml/trust-relation/metadata'

  it('should return 400 if controller throws InvalidRequestError', async () => {
    jest
      .spyOn(AddTrFromMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new InvalidRequestError('Invalid request on controller')
      })
    await request(app).post(endpoint).send({ any: 'data' }).expect(400)
  })
  it('should return InvalidRequestError message in body', async () => {
    jest
      .spyOn(AddTrFromMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new InvalidRequestError('Invalid request on controller')
      })
    await request(app)
      .post(endpoint)
      .expect(400)
      .expect('InvalidRequestError: Invalid request on controller')
  })
  it('should return 500 if exception as string is thrown', async () => {
    jest
      .spyOn(AddTrFromMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw 'Any other error ocurred'
      })
    await request(app).post(endpoint).expect(500)
  })
  it('should return 500 if any other error is thrown', async () => {
    class AnyOtherError extends Error {}
    jest
      .spyOn(AddTrFromMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new AnyOtherError('Any other error ocurred')
      })
    await request(app).post(endpoint).expect(500)
  })
  it('should return 201 if success', async () => {
    mockValidXmlDataEndpoint()
    await request(app)
      .post(endpoint)
      .send({
        name: 'valid name integration',
        url: 'https://remoteIdp.com/metadata'
      })
      .expect(201)
  })
  it('should return json content type', async () => {
    mockValidXmlDataEndpoint()
    await request(app)
      .post(endpoint)
      .send({
        name: 'valid name integration',
        url: 'https://remoteIdp.com/metadata'
      })
      .expect('Content-Type', /json/)
  })
  it('should return success message', async () => {
    mockValidXmlDataEndpoint()
    await request(app)
      .post(endpoint)
      .send({
        name: 'valid name integration',
        url: 'https://remoteIdp.com/metadata'
      })
      .expect({ creation: 'success' })
  })
  it('should persist object with expected data', async () => {
    await collection.drop()
    mockValidXmlDataEndpoint()
    await request(app)
      .post(endpoint)
      .send({
        name: 'valid name integration',
        url: 'https://remoteIdp.com/metadata'
      })
      .expect({ creation: 'success' })
    expect(await collection.countDocuments()).toEqual(1)
    const found = await collection.findOne()
    expect(found).not.toBeNull()
    if (found != null) {
      expect(found.trustRelation.props.remoteIdp.props.name).toEqual(
        'valid name integration'
      )
    }
  })
})
