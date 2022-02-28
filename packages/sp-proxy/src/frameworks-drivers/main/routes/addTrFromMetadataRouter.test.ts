import serverConfig from '@sp-proxy/frameworks-drivers/main/config/env'
import { mockValidXmlDataEndpoint } from '@sp-proxy/frameworks-drivers/main/mocks/externalMetadataUrl.mock'
import { mockSpProxyConfig } from '@sp-proxy/frameworks-drivers/main/mocks/mockSpProxyConfig.mock'
import routes from '@sp-proxy/frameworks-drivers/main/routes'
import { AddTrFromMetadataController } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataController'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import express from 'express'
import nock from 'nock'
import request from 'supertest'
import { mockAddTrEndpoint } from '../mocks/mockAddTrEndpoint'

jest.mock('@sp-proxy/interface-adapters/data/FileReadProxyConfig')

const app = express()
const encodeCredentials = (user: string, password: string): string => {
  return Buffer.from(`${user}:${password}`).toString('base64')
}
const validCredentials = encodeCredentials(
  serverConfig.adminUser,
  serverConfig.adminPassword
)

app.use(express.json())

describe('addTrFromMetadataRouter', () => {
  beforeAll(async () => {
    // setup app and db for testing this route
    app.use(routes)
    mockSpProxyConfig()
  })
  afterAll(async () => {
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
    await request(app)
      .post(endpoint)
      .set('authorization', validCredentials)
      .send({ any: 'data' })
      .expect(400)
  })
  it('should return InvalidRequestError message in body', async () => {
    jest
      .spyOn(AddTrFromMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new InvalidRequestError('Invalid request on controller')
      })
    await request(app)
      .post(endpoint)
      .set('authorization', validCredentials)
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
    await request(app)
      .post(endpoint)
      .set('authorization', validCredentials)
      .expect(500)
  })
  it('should return 500 if any other error is thrown', async () => {
    class AnyOtherError extends Error {}
    jest
      .spyOn(AddTrFromMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new AnyOtherError('Any other error ocurred')
      })
    await request(app)
      .post(endpoint)
      .set('authorization', validCredentials)
      .expect(500)
  })
  it('should return 201 if success', async () => {
    mockValidXmlDataEndpoint()
    mockAddTrEndpoint()
    await request(app)
      .post(endpoint)
      .set('authorization', validCredentials)
      .send({
        name: 'valid name integration',
        url: 'https://remoteIdp.com/metadata'
      })
      .expect(201)
  })
  it('should return json content type', async () => {
    mockAddTrEndpoint()
    mockValidXmlDataEndpoint()
    await request(app)
      .post(endpoint)
      .set('authorization', validCredentials)
      .send({
        name: 'valid name integration',
        url: 'https://remoteIdp.com/metadata'
      })
      .expect('Content-Type', /json/)
  })
  it('should return success message', async () => {
    mockAddTrEndpoint()
    mockValidXmlDataEndpoint()
    await request(app)
      .post(endpoint)
      .set('authorization', validCredentials)
      .send({
        name: 'valid name integration',
        url: 'https://remoteIdp.com/metadata'
      })
      .expect({ creation: 'success' })
  })
  it('should return 401 if wrong username', async () => {
    const wrongUser = 'wronguser'
    const validPwd = serverConfig.adminPassword
    const encoded = encodeCredentials(wrongUser, validPwd)

    await request(app)
      .post(endpoint)
      .set('authorization', encoded)
      .send({
        name: 'valid name integration',
        url: 'https://remoteIdp.com/metadata'
      })
      .expect(401)
  })
  it('should return 401 if wrong pwd', async () => {
    const validUser = serverConfig.adminUser
    const wrongPwd = 'wrongpwd'
    const encoded = encodeCredentials(validUser, wrongPwd)
    await request(app)
      .post(endpoint)
      .set('authorization', encoded)
      .send({
        name: 'valid name integration',
        url: 'https://remoteIdp.com/metadata'
      })
      .expect(401)
  })
  it('should return 401 if no credentials', async () => {
    await request(app)
      .post(endpoint)
      // .set('authorization', encoded)
      .send({
        name: 'valid name integration',
        url: 'https://remoteIdp.com/metadata'
      })
      .expect(401)
  })
})
