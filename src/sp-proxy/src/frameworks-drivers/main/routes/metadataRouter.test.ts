import routes from '@sp-proxy/frameworks-drivers/main/routes'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { GenerateMetadataController } from '@sp-proxy/interface-adapters/delivery/GenerateMetadataController'
import express from 'express'
import request from 'supertest'

const app = express()
app.use(routes)
describe('metadataRoute', () => {
  beforeAll(async () => {
    // setup app for testing this route
    const app = express()
    app.use(routes)
  })
  it('should return 400 if controller throws InvalidRequestError', async () => {
    jest
      .spyOn(GenerateMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new InvalidRequestError('Invalid request on controller')
      })
    await request(app).get('/sp/metadata').expect(400)
  })
  it('should return InvalidRequestError message in body', async () => {
    jest
      .spyOn(GenerateMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new InvalidRequestError('Invalid request on controller')
      })
    await request(app)
      .get('/sp/metadata')
      .expect(400)
      .expect('InvalidRequestError: Invalid request on controller')
  })
  it('should return 500 if any other error is thrown', async () => {
    class AnyOtherError extends Error {}
    jest
      .spyOn(GenerateMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new AnyOtherError('Any other error ocurred')
      })
    await request(app).get('/sp/metadata').expect(500)
  })
})
