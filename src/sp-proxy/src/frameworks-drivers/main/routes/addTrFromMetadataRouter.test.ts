import routes from '@sp-proxy/frameworks-drivers/main/routes'
import express from 'express'
import request from 'supertest'
import { mockSpProxyConfig } from '@sp-proxy/frameworks-drivers/main/mocks/mockSpProxyConfig.mock'
import { AddTrFromMetadataController } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataController'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'

jest.mock('@sp-proxy/interface-adapters/data/FileReadProxyConfig')

const app = express()

describe('addTrFromMetadataRouter', () => {
  beforeAll(async () => {
    // setup app for testing this route
    app.use(routes)
    mockSpProxyConfig()
  })
  afterAll(async () => {
    jest.clearAllMocks()
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
})
